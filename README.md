# MooAssets-vpm

MooAssets（`com.moulabo.mooassets`）の **VPM 配布専用 public リポジトリ**です。

開発用 Unity プロジェクト（MooAssets・private）とは別に、利用者向けの Listing と zip だけを公開します。

## VCC に登録する URL

**配布サイト（手順・アップデート Tips）:** https://moosan.github.io/MooAssets-vpm/

**Listing URL（VCC → Add Repository に貼る）:**

```
https://moosan.github.io/MooAssets-vpm/index.json
```

VCC → Settings → Packages → Add Repository に上記 URL を入力してください。

## アップデート・移行

UnityPackage（`Assets/MooAssets`）から VPM へ切り替える手順、バージョンアップのコツ、API 変更点は配布サイトの **アップデート・移行ガイド** を参照:

https://moosan.github.io/MooAssets-vpm/#upgrade

当面 BOOTH 等での配布は行わず、友人間では上記 URL を共有する想定です。

## 初回セットアップ（作者向け）

1. GitHub リポジトリ Settings → Pages → Source を **GitHub Actions** に設定
2. 下記「リリース手順」で v1.1.0 を公開
3. `source.json` を push すると Actions が `index.json` を生成し Pages にデプロイ

## リリース手順

1. 開発 repo で `Packages/com.moulabo.mooassets/CHANGELOG.md` を更新
   - 作業中は `[Unreleased]` に追記
   - リリース時は `[Unreleased]` を `[x.y.z] - 日付` にリネームし、新しい `[Unreleased]` を追加
2. 同じバージョン番号で `package.json` の `version` を更新
3. zip を生成:

   ```powershell
   cd MooAssets-vpm
   powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\build-package.ps1
   ```

   （`CHANGELOG.md` の見出しと version の整合をチェックし、公開 repo ルートへ CHANGELOG をミラー）

4. GitHub で **Release** を作成（Tag: `v1.1.0` など）
5. `packages/com.moulabo.mooassets-<version>.zip` を Release asset としてアップロード
6. Release の Description に `CHANGELOG.md` の該当バージョン節をコピー
7. `CHANGELOG.md` を main に push（Pages の更新履歴リンク用）
8. バージョン URL を変える場合のみ `source.json` を更新 → Listing 自動ビルド

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
