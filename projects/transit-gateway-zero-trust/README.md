# 🌐 AWS Transit Gateway Enterprise Hybrid Network & Zero-Trust Core

**作成者**: 山﨑 雄大 (Yudai Yamazaki)  
**分類**: AWS Transit Gateway / BGP VPN / Zero-Trust Security  
**災対要件**: RTO < 15分 / RPO < 5分  

---

## 📋 アーキテクチャ概要

AWS Transit Gateway を中心とした Hub-and-Spoke ネットワーク。オンプレミス拠点との二重冗長 IPsec VPN、および Inspection VPC による強制パケット検査。

```
[ On-Premises Data Center ]
     │ (Dual BGP IPsec VPN)
┌────▼────────────────────────────────────────────────────────┐
│ AWS Transit Gateway (Central Router)                        │
└────┬────────────────────────┬───────────────────────────────┘
     │                        │
┌────▼──────────┐        ┌────▼──────────┐
│ Inspection VPC│        │ Production VPC│
│ (WAF/Firewall)│        │ (App Workload)│
└───────────────┘        └───────────────┘
```

## 🛠️ 特徴

- **BGP Active/Active Dual Tunnel**: 2秒以内の高速経路自動切替
- **Zero-Trust Enforcement**: 全トラフィックのInspection VPC通過強制
- **Cross-Region DR**: ap-northeast-3 (関西リージョン) への暗号化バックアップ同期
