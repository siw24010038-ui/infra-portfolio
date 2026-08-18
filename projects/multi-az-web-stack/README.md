# 🏛️ AWS Multi-AZ Highly Available Web & DB Infrastructure (Terraform)

**作成者**: 山﨑 雄大 (Yudai Yamazaki)  
**分類**: AWS / Terraform / 高可用性アーキテクチャ  
**目標SLA**: 99.99% (年間停止時間 52.6分以内)  

---

## 📋 アーキテクチャ概要

本プロジェクトは、AWS上に2つのアベイラビリティゾーン (ap-northeast-1a / 1c) を跨ぐ完全冗長化スタックをTerraformでプロビジョニングする構成コードです。

```
[ Internet ]
     │
[ CloudFront + WAF ]
     │
[ Application Load Balancer ]
   ┌─┴──────────┐
(AZ 1a)      (AZ 1c)
 [EC2 ASG]    [EC2 ASG]   <-- Private Subnets
   └─┬──────────┘
(Primary)    (Replica)
 [Aurora]     [Aurora]    <-- Database Subnets (Multi-AZ)
```

## 🛠️ 主な構成要素

- **VPC Subnets**: Public / App Private / DB Private Subnets (Multi-AZ)
- **ALB**: Cross-Zone Load Balancing, TLS 1.3, `/healthz` ヘルスチェック
- **EC2 Auto Scaling**: CPU 70% Target Tracking Scaling Policy (min=2, max=10)
- **Amazon Aurora MySQL**: Multi-AZ Primary Writer + Reader Replica (自動フェイルオーバー < 30秒)
- **NAT Gateways**: AZごとに独立配置（NAT障害のAZ間伝播防止）

## 🚀 デプロイ手順 (Terraform)

```bash
# 初期化
terraform init

# 実行計画の確認
terraform plan

# リソースプロビジョニング
terraform apply
```
