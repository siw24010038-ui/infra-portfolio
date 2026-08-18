# ☸️ AWS EKS Microservices & ArgoCD GitOps Platform

**作成者**: 山﨑 雄大 (Yudai Yamazaki)  
**分類**: Kubernetes / AWS EKS / ArgoCD / GitOps  
**目標SLA**: 99.95% (無停止ローリングアップデート)  

---

## 📋 アーキテクチャ概要

AWS EKS クラスタ上で稼働するコンテナ基盤。ArgoCD による宣言的 GitOps デプロイと、Kubernetes の `PodDisruptionBudget` / `HPA` による高可用性運用を実現。

```
[ GitHub Repo ] ──(Sync)──> [ ArgoCD Controller ]
                                   │ (Apply Manifests)
                               ┌───▼───────────┐
                          [ EKS Worker Nodes ]
                          [ Pod ] [ Pod ] [ Pod ]
```

## 🛠️ 特徴

- **IRSA (IAM Roles for Service Accounts)**: Pod単位での最小権限制御
- **Zero Downtime Deployment**: `maxUnavailable: 0` 設定
- **Self-Healing**: 手動のCluster変更を検知しGitの正解状態へ自動復元
- **Observability**: Prometheus & Grafana ダッシュボード連動
