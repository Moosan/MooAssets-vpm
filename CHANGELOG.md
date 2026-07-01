# Changelog

MooAssets の変更履歴。形式は [Keep a Changelog](https://keepachangelog.com/ja/) に準拠。

## [Unreleased]

## [1.1.0] - 2026-07-01

### 追加

- VPM 配布対応（VRChat Creator Companion からインストール可能）
- 配布サイト・移行ガイド: https://moosan.github.io/MooAssets-vpm/
- パッケージ内サンプル `Samples/UToggleEventSystemサンプル/UToggleEventSystemとは`

### 変更

- 配布物の正本を `Packages/com.moulabo.mooassets/` に統一（UnityPackage 向け `Assets/MooAssets` 二重管理を廃止）
- Editor スクリプトを `Editor/` に分離（`MooAssets.Editor.asmdef`）
- Util のエリア検知 API を刷新: `InAreaPlayer` / `BaseInAreaEventListener` → `AreaPlayerNotify`（`AreaPlayerUpdate` / `LocalPlayerIn` 等）
- `vpmDependencies` に `red.sim.lightvolumes` を追加

### 削除

- UnityPackage 向け Export 手順（VPM zip 生成に移行）

## [1.0.8] - 2025-09-20

### 修正

- EventEntryUseのIsKinematicをオンに変更(1.0.7でオフにしてたけどやめた)

## [1.0.7] - 2025-09-20

### 追加

- コンベアー追加
- デモシーンにLightVolume追加

### 修正

- Kinematic関連のワーニング修正
- FontのReadableワーニング修正
- VRCSDK更新
- FukuroUdonSDK更新
- AreaPlayer関連ログ追加
- Licence表記修正
- PlayerListの表示順保証
- ルーレットのソート機能追加

## [1.0.6] - 2025-08-20

### 追加

- ManagerModeに、管理者だけオフの機能を追加

## [1.0.5] - 2025-08-18

### 追加

- 除外リストつき全プレイヤーリスト追加
- AllFallBackのFontAsset追加

## [1.0.4] - 2025-08-08

### 修正

- 統一EventEntryのSyncModeを、None固定から自由に変更

## [1.0.3] - 2025-08-02

### 追加

- ToggleableAnimatorに複数のAnimatorを登録する項目追加
- ToggleableRespawnをManualOSに対応と複数に対応

### 修正

- EventEntryのDelay機能を、DelayOff機能であることの明記

### 削除

- ToggleableAnimatorExtensionが空だったので削除

## [1.0.2] - 2025-08-01

### 追加

- DemoシーンにTipsの列を追加
- 複数InteractのTips追加
- Animation操作のTips追加
- UPlayableのTips追加

### 修正

- デモシーンのAreaPlayerEventをマスターのみから全体に変更
- コードをRuntimeに移動
- アセンブリの名称をMooAssetsに変更
- ライセンス表記追加
- デモシーンの配置微修正

## [1.0.1] - 2025-07-28

### 追加

- BodyPartにオフセット追加とTips追加
- AreaPlayerCountEventEntryの追加

## [1.0.0] - 2025-07-25

### 追加

- サンプルシーンの追加
- PlayablePosition/Rotation/Scaleの追加
- UToggleablePlayableOnOffの追加
- Utilのテレポートで、回転を保持するモード追加

### 修正

- いくつかのToggleMethodの微修正
- いくつかのUtilの微修正
- EventEntryのSyncModeを一律でNoneに修正

### 削除

- 古いデモシーンやプレファブ等の削除

## [0.9.0] - 2025-07-15

### 追加

- バージョン情報の追加
