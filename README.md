# MooAssets-vpm

MooAssets（`com.moulabo.mooassets`）の **VPM 配布専用 public リポジトリ**です。

開発用 Unity プロジェクト（MooAssets・private）とは別に、利用者向けの Listing と zip だけを公開します。

## VCC に登録する URL

```
https://moosan.github.io/MooAssets-vpm/index.json
```

VCC → Settings → Packages → Add Repository に上記 URL を入力してください。

## 初回セットアップ（作者向け）

1. GitHub リポジトリ Settings → Pages → Source を **GitHub Actions** に設定
2. 下記「リリース手順」で v1.1.0 を公開
3. `source.json` を push すると Actions が `index.json` を生成し Pages にデプロイ

## リリース手順

1. MooAssets 側で `Packages/com.moulabo.mooassets/package.json` の version を更新
2. zip を生成:

   ```powershell
   cd MooAssets-vpm
   .\scripts\build-package.ps1
   ```

3. GitHub で **Release** を作成（Tag: `v1.1.0` など）
4. `packages/com.moulabo.mooassets-<version>.zip` を Release asset としてアップロード
5. `source.json` の `packages[].releases` に Release の zip URL を追加（または更新）
6. `source.json` を main に push → Listing 自動ビルド

**注意**: Release を公開する前に `source.json` だけ push すると Actions が zip 取得に失敗します。先に Release、後に Listing 更新の順で行ってください。

## ファイル構成

| ファイル | 役割 |
|---|---|
| `source.json` | Listing 生成の入力（パッケージ ID・Release zip URL） |
| `index.json` | Actions が生成（GitHub Pages で公開・手編集しない） |
| `packages/*.zip` | ローカルビルド出力（Git には含めない・Release に upload） |
| `.github/workflows/build-listing.yml` | VRChat 公式テンプレートベースの Listing ビルド |

## 関連

- 開発リポジトリ: MooAssets（private）
- 実装計画: MoulaWorkSpace `docs/plans/PLAN-0011-mooassets-vpm-migration.html`
