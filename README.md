# ☁️ Yudai Yamazaki - IT Infrastructure & Cloud Engineer Portfolio

[![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)](https://www.terraform.io/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**山﨑 雄大（Yudai Yamazaki）** のITインフラ／クラウドエンジニア ポートフォリオ リポジトリです。  
単一障害点（SPOF）を排除した高可用性（Multi-AZ）アーキテクチャ設計と、**Infrastructure as Code (Terraform)** による完全コード化・自動化を軸とした作品群を公開しています。

---

## 🚀 掲載作品一覧 (Featured Infrastructure Projects)

| # | 作品名 | 主な技術スタック | 目標SLA | 主な特徴 |
|---|---|---|---|---|
| **1** | [AWS マルチAZ高可用性 Web/DB インフラ基盤](#1-aws-マルチaz高可用性-webdb-インフラ基盤) | AWS (ALB, EC2 ASG, Aurora MySQL), Terraform, KMS | **99.99%** | Multi-AZ冗長化、30秒自動フェイルオーバー、NAT GW孤立配置 |
| **2** | [AWS EKS マイクロサービス & ArgoCD GitOps 基盤](#2-aws-eks-マイクロサービス--argocd-gitops-基盤) | EKS, Helm, ArgoCD, HPA, PDB, GitHub Actions | **99.95%** | ゼロダウンタイムデプロイ、自律修復(Self-Healing)、IRSA最小権限 |
| **3** | [Transit Gateway ゼロトラスト統合ネットワーク基盤](#3-transit-gateway-ゼロトラスト統合ネットワーク基盤) | Transit Gateway, Site-to-Site VPN, AWS WAF, GuardDuty | **DR対応** | BGPアクティブ冗長VPN, Hub-and-Spoke統合網, RTO<15分/RPO<5分 |

---

## 📐 作品詳細 (Project Deep Dive)

### 1. AWS マルチAZ高可用性 Web/DB インフラ基盤

![AWS Architecture](https://img.shields.io/badge/AWS-Multi--AZ_Architecture-orange?style=flat-square)

2つのアベイラビリティゾーン（`ap-northeast-1a` / `1c`）に跨る完全冗長化Web/DBスタック。

```text
[ Internet ]
     │
┌────▼────────────────────────────────────────────────────────┐
│ Amazon CloudFront (CDN / Edge WAF)                          │
└────┬────────────────────────────────────────────────────────┘
     │
┌────▼────────────────────────────────────────────────────────┐
│ Application Load Balancer (Public Subnet 1a / 1c)           │
└────┬────────────────────────┬───────────────────────────────┘
     │ (AZ 1a)                │ (AZ 1c)
┌────▼──────────────────┐┌────▼──────────────────┐
│ EC2 Auto Scaling Group││ EC2 Auto Scaling Group│ (App Subnet)
└────┬──────────────────┘└────┬──────────────────┘
     │ (Primary Writer)       │ (Replica Reader)
┌────▼──────────────────┐┌────▼──────────────────┐
│ Aurora MySQL (1a)     ││ Aurora MySQL (1c)     │ (DB Subnet)
└───────────────────────┘└───────────────────────┘
```

- **Terraform構成モジュール**: `vpc.tf`, `alb.tf`, `asg.tf`, `rds.tf`
- **可用性設計**:
  - Web/AP層: ALBヘルスチェックによる自動切り離し & EC2 Auto Scaling (2〜10台)
  - DB層: Amazon Aurora Multi-AZ により、Primary障害発生時に30秒以内で自動フェイルオーバー
  - ネットワーク層: AZごとに独立したNAT Gatewayを配置し、AZ障害の相互波及を防止

---

### 2. AWS EKS マイクロサービス & ArgoCD GitOps 基盤

![Kubernetes](https://img.shields.io/badge/Kubernetes-EKS_GitOps-blue?style=flat-square)

ArgoCD を用いた GitOps による宣言型コンテナ基盤。

- **主な構成要素**: AWS EKS, Managed Node Groups (Spot/On-Demandハイブリッド), ArgoCD, Prometheus, Grafana
- **可用性設計**:
  - `PodDisruptionBudget (PDB)`: ノードドレイン・メンテナンス時も常時最低2Podの稼働を保障
  - `HorizontalPodAutoscaler (HPA)`: CPU 70%超過時に即座に3〜20Podへ自動スケール
  - `Zero Downtime`: `maxUnavailable: 0` スティッキー設定による無停止ローリングアップデート

---

### 3. Transit Gateway ゼロトラスト統合ネットワーク基盤

![Network](https://img.shields.io/badge/Network-Transit_Gateway_VPN-purple?style=flat-square)

オンプレミスデータセンターと複数のVPC（Prod / Staging / Inspection）を統合するエンタープライズ構成。

- **主な構成要素**: AWS Transit Gateway, Site-to-Site VPN (BGP), AWS Network Firewall, AWS WAF v2, GuardDuty, Security Hub
- **可用性・災対設計**:
  - 2本の独立したIPsec VPNトンネルをBGP動的ルーティングで冗長化（切り替え時間 < 2秒）
  - 関西リージョン (`ap-northeast-3`) への毎時KMS暗号化スナップショット同期 (RTO < 15分, RPO < 5分)

---

## 🛠️ 技術スタック & スキル (Tech Stack)

```gantt
AWS (VPC, EC2, ALB, RDS, EKS, TGW, S3, CloudFront)
Terraform (HCL Modules, State Management, Workspace)
Kubernetes / Docker (Helm, ArgoCD, Manifests)
Linux / Scripting (Amazon Linux 2023, Bash, Python)
Monitoring & Security (Prometheus, Grafana, CloudWatch, AWS WAF)
```

---

## 💻 ポートフォリオWebアプリケーションの起動方法

本リポジトリには、上記の構成図やTerraformコードをブラウザ上で視覚的に検証できるインタラクティブWebアプリが含まれています。

### 必要環境
- Node.js 18.x 以上
- npm 9.x 以上

### セットアップ手順

```bash
# リポジトリのクローン
git clone https://github.com/your-username/infra-portfolio.git
cd infra-portfolio

# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

起動後、ブラウザで `http://localhost:5173/` にアクセスしてください。

### プロダクションビルド

```bash
npm run build
```

---

## 👤 作成者情報 (Author)

- **名前**: 山﨑 雄大 (Yudai Yamazaki)
- **区分**: IT系専門学校生 / クラウド・インフラエンジニア志望
- **学習テーマ・こだわり**:
  1. **SPOF（単一障害点）のない Multi-AZ 構成の徹底追及**
  2. **100% Infrastructure as Code (Terraform) による構築の再現性と自動化**
  3. **最小権限セキュリティ原則 (Least Privilege) と通信暗号化の徹底**

---

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照してください。
