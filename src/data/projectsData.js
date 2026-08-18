export const projectsData = [
  {
    id: "multi-az-web-stack",
    title: "AWS マルチAZ高可用性 Web/DB インフラ基盤",
    englishTitle: "Multi-AZ Highly Available Web & DB Architecture",
    category: "AWS / Terraform / 高可用性",
    badge: "99.99% SLA 対応",
    summary: "2つのアベイラビリティゾーンに跨る完全冗長化構成。ALB+Auto Scaling+Aurora (Multi-AZ) により、単一障害点(SPOF)を排除した堅牢なクラウド基盤。",
    targetSla: "99.99%",
    rto: "即時〜30秒 (自動)",
    rpo: "0秒 (同期複製)",
    estimatedCost: "$294 / 月",
    tags: ["AWS", "Terraform", "Multi-AZ", "ALB", "Auto Scaling", "Aurora MySQL", "CloudFront", "S3", "KMS"],
    nodes: [
      {
        id: "cloudfront",
        name: "Amazon CloudFront",
        type: "CDN / Edge",
        az: "Global Edge",
        status: "Healthy",
        detail: "グローバルエッジネットワークでの静的コンテンツキャッシュおよびAWS WAF統合によるDDoS/Web攻撃防御。"
      },
      {
        id: "alb",
        name: "Application Load Balancer",
        type: "Load Balancer",
        az: "Multi-AZ (1a / 1c)",
        status: "Healthy",
        detail: "クロスゾーン負荷分散を有効化。HTTPS SSL/TLS終端処理およびターゲットグループヘルスチェック（/healthz）。"
      },
      {
        id: "asg-ec2",
        name: "EC2 Auto Scaling Group",
        type: "Compute",
        az: "Private Subnet (1a / 1c)",
        status: "Scaling (2-10 units)",
        detail: "CPU使用率70%目標のスケーリングポリシー。AZ障害発生時は他AZのインスタンスが自動的に負荷を引き継ぎ増設。"
      },
      {
        id: "aurora-db",
        name: "Amazon Aurora MySQL",
        type: "Database (Multi-AZ)",
        az: "Database Subnet (1a / 1c)",
        status: "Primary + Reader",
        detail: "Primary Writer (1a) + Replica Reader (1c)。Primary障害時は約30秒以内に自動フェイルオーバーとDNS更新が完了。"
      },
      {
        id: "nat-gw",
        name: "Redundant NAT Gateways",
        type: "Network",
        az: "Public Subnet (1a / 1c)",
        status: "Active / Active",
        detail: "AZごとに独立してNAT Gatewayを配置。片方のAZ障害が他方のAZのアウトバウンド通信に影響を与えない独立性を保持。"
      },
      {
        id: "s3-kms",
        name: "S3 Bucket (KMS Encrypted)",
        type: "Storage",
        az: "Regional",
        status: "Protected",
        detail: "AWS KMS カスタマー管理鍵 (CMK) によるサーバーサイド暗号化、ライフサイクルルール、バージョニング有効化。"
      }
    ],
    codeFiles: [
      {
        filename: "vpc.tf",
        language: "hcl",
        code: `# ==============================================================================
# VPC & Subnet Architecture (Multi-AZ Configuration)
# ==============================================================================

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "yamazaki-prd-vpc"
    Environment = "production"
    ManagedBy   = "Terraform"
    Owner       = "Yudai Yamazaki"
  }
}

# Public Subnets (AZ-a / AZ-c)
resource "aws_subnet" "public_1a" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "ap-northeast-1a"
  map_public_ip_on_launch = true

  tags = { Name = "yamazaki-prd-pub-sub-1a" }
}

resource "aws_subnet" "public_1c" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "ap-northeast-1c"
  map_public_ip_on_launch = true

  tags = { Name = "yamazaki-prd-pub-sub-1c" }
}

# Private App Subnets (AZ-a / AZ-c)
resource "aws_subnet" "private_1a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.10.0/24"
  availability_zone = "ap-northeast-1a"

  tags = { Name = "yamazaki-prd-app-sub-1a" }
}

resource "aws_subnet" "private_1c" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.11.0/24"
  availability_zone = "ap-northeast-1c"

  tags = { Name = "yamazaki-prd-app-sub-1c" }
}

# Redundant NAT Gateways per AZ (High Availability)
resource "aws_eip" "nat_1a" { vpc = true }
resource "aws_eip" "nat_1c" { vpc = true }

resource "aws_nat_gateway" "gw_1a" {
  allocation_id = aws_eip.nat_1a.id
  subnet_id     = aws_subnet.public_1a.id
  tags          = { Name = "yamazaki-nat-gw-1a" }
}

resource "aws_nat_gateway" "gw_1c" {
  allocation_id = aws_eip.nat_1c.id
  subnet_id     = aws_subnet.public_1c.id
  tags          = { Name = "yamazaki-nat-gw-1c" }
}`
      },
      {
        filename: "alb.tf",
        language: "hcl",
        code: `# ==============================================================================
# Application Load Balancer & Security Group Configuration
# ==============================================================================

resource "aws_lb" "external_alb" {
  name               = "yamazaki-prd-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = [aws_subnet.public_1a.id, aws_subnet.public_1c.id]

  enable_cross_zone_load_balancing = true

  tags = {
    Environment = "production"
  }
}

resource "aws_lb_target_group" "app_tg" {
  name     = "yamazaki-app-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id

  health_check {
    enabled             = true
    path                = "/healthz"
    protocol            = "HTTP"
    healthy_threshold   = 3
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 15
    matcher             = "200"
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.external_alb.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = var.acm_certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app_tg.arn
  }
}`
      },
      {
        filename: "rds.tf",
        language: "hcl",
        code: `# ==============================================================================
# Amazon Aurora MySQL Multi-AZ Cluster (Zero Single Point of Failure)
# ==============================================================================

resource "aws_rds_cluster" "aurora" {
  cluster_identifier      = "yamazaki-aurora-cluster"
  engine                  = "aurora-mysql"
  engine_version          = "8.0.mysql_aurora.3.04.0"
  database_name           = "appdb"
  master_username         = "adminuser"
  master_password         = var.db_password
  db_subnet_group_name    = aws_db_subnet_group.db_subnets.name
  vpc_security_group_ids = [aws_security_group.db_sg.id]

  storage_encrypted       = true
  kms_key_id              = aws_kms_key.db_key.arn
  backup_retention_period = 30
  preferred_backup_window = "18:00-19:00"

  skip_final_snapshot     = false
  final_snapshot_identifier = "yamazaki-aurora-final-snapshot"

  tags = {
    Environment = "production"
  }
}

# Primary Writer Instance (AZ 1a)
resource "aws_rds_cluster_instance" "writer" {
  identifier         = "yamazaki-aurora-writer-1a"
  cluster_identifier = aws_rds_cluster.aurora.id
  instance_class     = "db.r6g.xlarge"
  engine             = aws_rds_cluster.aurora.engine
  engine_version     = aws_rds_cluster.aurora.engine_version
  publicly_accessible = false
  promotion_tier     = 1
}

# Failover Reader Instance (AZ 1c)
resource "aws_rds_cluster_instance" "reader" {
  identifier         = "yamazaki-aurora-reader-1c"
  cluster_identifier = aws_rds_cluster.aurora.id
  instance_class     = "db.r6g.xlarge"
  engine             = aws_rds_cluster.aurora.engine
  engine_version     = aws_rds_cluster.aurora.engine_version
  publicly_accessible = false
  promotion_tier     = 2
}`
      }
    ],
    availabilityDetails: {
      spofChecklist: [
        { item: "Web/APサーバー冗長化", status: "PASS", detail: "Multi-AZに跨るAuto Scaling Groupにより最小2台で負荷分散" },
        { item: "データベース自動即時昇格", status: "PASS", detail: "Aurora Multi-AZ レプリカによる30秒以内のフェイルオーバー" },
        { item: "ネットワーク出口の孤立防止", status: "PASS", detail: "AZごとに独立したNAT Gatewayを配置し相互障害波及を遮断" },
        { item: "ロードバランサー可用性", status: "PASS", detail: "AWS Managed ALB による複数AZ自動スケーリング" },
        { item: "データバックアップ＆暗号化", status: "PASS", detail: "KMS暗号化 + S3 30日間自動バックアップ + PITR (Point-in-Time)" }
      ],
      failoverScenario: "AZ-1aでデータセンター障害（停電等）が発生した場合、ALBは1aのEC2へのトラフィック配送を直ちに停止。1cのEC2が処理を受け継続し、同時にAuto Scalingが1c内に代替EC2を自動プロビジョニング。Aurora DBも1cのReaderが自動的にPrimary Writerへ昇格し、アプリケーションからの接続文字列(DNS)の書き換えなしでサービスを継続。",
      metrics: [
        { label: "単一障害点 (SPOF)", value: "0" },
        { label: "AZ障害耐性", value: "完全対応 (Multi-AZ)" },
        { label: "バックアップ保持期間", value: "30 日間 (PITR対応)" },
        { label: "通信暗号化", value: "TLS 1.3 + KMS (Rest & Transit)" }
      ]
    }
  },
  {
    id: "eks-gitops-microservices",
    title: "AWS EKS マイクロサービス & ArgoCD GitOps 基盤",
    englishTitle: "EKS Container Orchestration & GitOps Automation",
    category: "Kubernetes / GitOps / CI/CD",
    badge: "GitOps 宣言的運用",
    summary: "AWS EKS Cluster と ArgoCD による完全宣言型デプロイ。PodDisruptionBudget と HPA により、バージョンアップ時もダウンタイムゼロを実現。",
    targetSla: "99.95%",
    rto: "5分以内 (マニフェスト再適用)",
    rpo: "0秒 (Git管理状態)",
    estimatedCost: "$193 / 月",
    tags: ["Kubernetes", "AWS EKS", "ArgoCD", "Helm", "Docker", "GitHub Actions", "Prometheus", "Grafana", "IRSA"],
    nodes: [
      {
        id: "eks-cp",
        name: "EKS Control Plane",
        type: "Managed Control Plane",
        az: "AWS Managed (Multi-AZ)",
        status: "Healthy",
        detail: "AWS管理下のKubernetes API Serverおよびetcd。3つのAZに分散配置され高可用性を自動維持。"
      },
      {
        id: "eks-nodes",
        name: "Managed Node Groups",
        type: "Worker Nodes",
        az: "Multi-AZ (1a / 1c / 1d)",
        status: "Auto Scaled",
        detail: "On-Demand と Spot インスタンスのハイブリッド構成。Karpenterによる即座のノード追加・集約。"
      },
      {
        id: "argocd",
        name: "ArgoCD Engine",
        type: "GitOps Controller",
        az: "Cluster Pod",
        status: "In-Sync",
        detail: "Gitリポジトリを単一の正実（Single Source of Truth）として追従。差分検知時に自動同期・自己修復。"
      },
      {
        id: "alb-ingress",
        name: "AWS Load Balancer Controller",
        type: "Ingress",
        az: "Cluster Pod / AWS ALB",
        status: "Active",
        detail: "Ingressマニフェスト定義に応じてALBおよびTargetGroupBindingを全自動作成・管理。"
      },
      {
        id: "prom-grafana",
        name: "Prometheus & Grafana",
        type: "Observability",
        az: "Cluster Pod",
        status: "Monitoring",
        detail: "Pod CPU/Mem、ネットワークIO、Ingressリクエスト成功率をミリ秒単位で収集しダッシュボード化。"
      }
    ],
    codeFiles: [
      {
        filename: "eks_cluster.tf",
        language: "hcl",
        code: `# ==============================================================================
# AWS EKS Cluster Setup with IRSA (IAM Roles for Service Accounts)
# ==============================================================================

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.15"

  cluster_name    = "yamazaki-microservices-eks"
  cluster_version = "1.28"

  cluster_endpoint_public_access  = true
  cluster_endpoint_private_access = true

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  # IRSA for secure AWS API access per Service Account
  enable_irsa = true

  eks_managed_node_groups = {
    general = {
      min_size     = 2
      max_size     = 10
      desired_size = 3

      instance_types = ["t3.medium", "t3a.medium"]
      capacity_type  = "ON_DEMAND"

      labels = {
        role = "general-workload"
      }
    }
    spot_workers = {
      min_size     = 0
      max_size     = 10
      desired_size = 2

      instance_types = ["t3.large", "t3a.large"]
      capacity_type  = "SPOT"

      labels = {
        role = "spot-processor"
      }
    }
  }

  tags = {
    Environment = "production"
    CreatedBy   = "Yudai Yamazaki"
  }
}`
      },
      {
        filename: "app_manifest.yaml",
        language: "yaml",
        code: `# ==============================================================================
# Production Deployment with Zero-Downtime Rolling Update & HPA
# ==============================================================================

apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
  namespace: production
  labels:
    app: order-service
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 0
  selector:
    matchLabels:
      app: order-service
  template:
    metadata:
      labels:
        app: order-service
    spec:
      containers:
      - name: order-api
        image: 123456789012.dkr.ecr.ap-northeast-1.amazonaws.com/order-api:v2.1.0
        ports:
        - containerPort: 8080
        resources:
          requests:
            cpu: "250m"
            memory: "256Mi"
          limits:
            cpu: "500m"
            memory: "512Mi"
        readinessProbe:
          httpGet:
            path: /healthz/ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
        livenessProbe:
          httpGet:
            path: /healthz/live
            port: 8080
          initialDelaySeconds: 15
          periodSeconds: 10
---
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: order-service-pdb
  namespace: production
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: order-service
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: order-service-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: order-service
  minReplicas: 3
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70`
      }
    ],
    availabilityDetails: {
      spofChecklist: [
        { item: "ローリングアップデート無停止保障", status: "PASS", detail: "maxUnavailable: 0 により旧Podを全件維持したまま新Pod順次起動" },
        { item: "PodDisruptionBudget (PDB)", status: "PASS", detail: "ノード排出やメンテナンス時も最低2Podの常時稼働を保証" },
        { item: "スポットインスタンス中断対策", status: "PASS", detail: "Spot Termination Notice検知による即時Graceful Drain" },
        { item: "GitOps自動修復 (Self-Healing)", status: "PASS", detail: "Kubernetes内の手動変更をArgoCDが自動検知しGitの定義へリセット" }
      ],
      failoverScenario: "EKSのワーカーノード障害時、Kubernetes Control PlaneがノードのUnreachable状態を検知し、該当ノード上のPodを別ノードへ自動退避（Eviction & Reschedule）。PDBにより常時最低必要Pod数が担保されているため、エンドユーザーへのサービスリクエスト失敗率は0%を維持。",
      metrics: [
        { label: "ゼロダウンタイムデプロイ", value: "完全対応 (maxUnavailable: 0)" },
        { label: "自動復元時間 (Self-Healing)", value: "30秒以内 (ArgoCD Sync)" },
        { label: "Pod最小稼働数保証", value: "minAvailable: 2" },
        { label: "自動スケーリングレンジ", value: "3 Pods ～ 20 Pods" }
      ]
    }
  },
  {
    id: "transit-gateway-zero-trust",
    title: "Transit Gateway ゼロトラスト統合ネットワーク基盤",
    englishTitle: "Transit Gateway Enterprise Network & Zero-Trust Core",
    category: "ネットワーク / ゼロトラスト / クラウドセキュリティ",
    badge: "エンタープライズ統合網",
    summary: "AWS Transit Gatewayを中心としたHub-and-Spoke構成。オンプレミス拠点との二重冗長VPN、AWS WAF / Security Hubによる監視・ゼロトラスト防御アーキテクチャ。",
    targetSla: "99.99%",
    rto: "< 15分 (DR切り替え)",
    rpo: "< 5分 (別リージョンバックアップ)",
    estimatedCost: "$331 / 月",
    tags: ["AWS Transit Gateway", "VPN", "AWS WAF", "GuardDuty", "Security Hub", "Terraform", "Zero Trust", "Vault"],
    nodes: [
      {
        id: "tgw",
        name: "AWS Transit Gateway",
        type: "Network Core Router",
        az: "Multi-AZ Attachments",
        status: "Active",
        detail: "複数VPC（Prod / Staging / Inspection）およびオンプレミス拠点網を接続する中央ルーター。"
      },
      {
        id: "inspection-vpc",
        name: "Inspection VPC (WAF & Firewall)",
        type: "Security Inspection",
        az: "Multi-AZ",
        status: "Active",
        detail: "全インバウンド・アウトバウンドトラフィックを強制集約し、AWS Network Firewall と WAF でディープパケット検査。"
      },
      {
        id: "vpn-onprem",
        name: "Redundant IPsec VPN Tunnels",
        type: "Hybrid Network",
        az: "Dual Tunnel (BGP)",
        status: "Established",
        detail: "オンプレミス拠点との間に2本の独立したIPsec VPNトンネルを構築。BGP動的ルーティングによるミリ秒障害切り替え。"
      },
      {
        id: "security-hub",
        name: "Security Hub & GuardDuty",
        type: "SIEM & Threat Intel",
        az: "Global / Multi-Region",
        status: "Monitoring",
        detail: "機械学習ベースの脅威検知 (GuardDuty) と CIS AWS Foundations Benchmark 準拠の自動セキュリティ評価。"
      }
    ],
    codeFiles: [
      {
        filename: "tgw.tf",
        language: "hcl",
        code: `# ==============================================================================
# AWS Transit Gateway & Multi-VPC Hub-and-Spoke Routing Table
# ==============================================================================

resource "aws_ec2_transit_gateway" "central_tgw" {
  description                     = "Yamazaki Central Enterprise TGW Router"
  amazon_side_asn                 = 64512
  auto_accept_shared_attachments  = "enable"
  default_route_table_association = "disable"
  default_route_table_propagation = "disable"

  tags = {
    Name        = "yamazaki-central-tgw"
    Environment = "production"
    Owner       = "Yudai Yamazaki"
  }
}

# TGW Route Table for Production Workloads
resource "aws_ec2_transit_gateway_route_table" "prod_rt" {
  transit_gateway_id = aws_ec2_transit_gateway.central_tgw.id
  tags               = { Name = "yamazaki-tgw-prod-rt" }
}

# Attach Production VPC to Transit Gateway across Multi-AZ
resource "aws_ec2_transit_gateway_vpc_attachment" "prod_attach" {
  transit_gateway_id = aws_ec2_transit_gateway.central_tgw.id
  vpc_id             = aws_vpc.prod_vpc.id
  subnet_ids         = [aws_subnet.prod_tgw_sub_1a.id, aws_subnet.prod_tgw_sub_1c.id]

  dns_support        = "enable"

  tags = { Name = "yamazaki-tgw-attach-prod" }
}

# Route all external traffic via Inspection VPC (Zero-Trust Enforcement)
resource "aws_ec2_transit_gateway_route" "default_to_inspection" {
  destination_cidr_block         = "0.0.0.0/0"
  transit_gateway_attachment_id  = aws_ec2_transit_gateway_vpc_attachment.inspection_attach.id
  transit_gateway_route_table_id = aws_ec2_transit_gateway_route_table.prod_rt.id
}`
      },
      {
        filename: "vpn.tf",
        language: "hcl",
        code: `# ==============================================================================
# BGP Redundant IPsec VPN Tunnels to On-Premises Data Center
# ==============================================================================

resource "aws_customer_gateway" "onprem_router" {
  bgp_asn    = 65000
  ip_address = var.onprem_public_ip
  type       = "ipsec.1"

  tags = { Name = "yamazaki-onprem-cgw" }
}

resource "aws_vpn_connection" "tgw_vpn" {
  transit_gateway_id  = aws_ec2_transit_gateway.central_tgw.id
  customer_gateway_id = aws_customer_gateway.onprem_router.id
  type                = "ipsec.1"
  static_routes_only  = false

  tunnel1_inside_cidr = "169.254.10.0/30"
  tunnel2_inside_cidr = "169.254.11.0/30"

  tunnel1_preshared_key = var.vpn_tunnel1_secret
  tunnel2_preshared_key = var.vpn_tunnel2_secret

  tags = { Name = "yamazaki-hybrid-vpn-connection" }
}`
      }
    ],
    availabilityDetails: {
      spofChecklist: [
        { item: "二重冗長 VPN トンネル", status: "PASS", detail: "2本の独立したIPsec TunnelとBGPによる数秒単位の自動フェイルオーバー" },
        { item: "Inspection VPC 集約検査", status: "PASS", detail: "全VPCのトラフィックをWAF/Firewall経由強制ルーティングしシャドーIT排除" },
        { item: "災対 (DR) 別リージョン同期", status: "PASS", detail: "ap-northeast-3 (関西リージョン) へKMS暗号化スナップショットを毎時非同期転送" },
        { item: "最小権限アクセスコントロール", status: "PASS", detail: "IAM Identity Center + SSO + 短時間トークン発行によるゼロトラスト徹底" }
      ],
      failoverScenario: "オンプレミス拠点の主系VPNルーター回線切断時、BGP Hold-Timeタイマー切れ（またはKeepalive疎通不能）を検知し、即座に副系VPNトンネルへ経路を自動切替。トラフィック停止時間は2秒未満に抑制される。",
      metrics: [
        { label: "目標復旧時間 (RTO)", value: "< 15 分 (DR発動時)" },
        { label: "目標復旧時点 (RPO)", value: "< 5 分 (差分バックアップ)" },
        { label: "VPN 冗長化方式", value: "BGP Active / Active Dual Tunnel" },
        { label: "セキュリティ適合基準", value: "CIS AWS Benchmark 100% 達成" }
      ]
    }
  }
];

export const engineerProfile = {
  name: "山﨑 雄大",
  nameEnglish: "Yudai Yamazaki",
  role: "IT Infrastructure & Cloud Engineer",
  tagline: "可用性・冗長化の徹底追求と Infrastructure as Code (Terraform) による再現可能なモダンクラウド基盤の構築",
  bio: "AWS / Linux / Terraform を軸としたクラウドインフラエンジニア。単一障害点(SPOF)のない高可用性アーキテクチャ設計、自動化による運用コスト削減、GitOpsを用いた現代的なコンテナ基盤の構築を得意としています。",
  location: "Saitama, Japan",
  socials: {
    github: "https://github.com/siw24010038-ui/infra-portfolio",
    qiita: "https://qiita.com",
    zenn: "https://zenn.dev",
    email: "siw24010038@gmail.com"
  },
  skills: [
    { category: "Cloud & Virtualization", items: ["AWS (VPC, EC2, ALB, RDS, EKS, TGW, CloudFront)", "Docker", "Kubernetes"] },
    { category: "Infrastructure as Code", items: ["Terraform", "Ansible", "CloudFormation", "Helm"] },
    { category: "CI/CD & GitOps", items: ["GitHub Actions", "ArgoCD", "GitLab CI"] },
    { category: "Monitoring & Security", items: ["Prometheus", "Grafana", "CloudWatch", "AWS WAF", "GuardDuty"] },
    { category: "OS & Scripting", items: ["Linux (Ubuntu, Amazon Linux 2/2023)", "Bash", "Python", "SQL"] }
  ]
};
