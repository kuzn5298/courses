const build = require("esbuild").build;
const copy = require("fs-extra").copy;
const rimraf = require("rimraf");
const path = require("path");

const options = {
  entryPoints: ["app.cjs"],
  bundle: true,
  platform: "node",
  outfile: "dist/app.js",
  minify: true,
  sourcemap: true,
};

(async () => {
  try {
    console.log("⚡ Build started...");

    await build(options);
    console.log("✅ Backend built!");

    const directoriesToRemove = ["node_modules"]; // Сюда можно добавлять все другие директории для удаления
    for (const dir of directoriesToRemove) {
      const dirPath = path.resolve(__dirname, dir);
      rimraf.sync(dirPath);
      console.log(`✅ Deleted: ${dir}`);
    }

    console.log("🎉 Build completed!");
  } catch (error) {
    console.error("❌ Build error:", error);
    process.exit(1);
  }
})();
