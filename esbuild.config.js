import esbuild from "esbuild";
import url from "url";
import copyPlugin from "./.esbuild/copyPlugin.js";

const entryPoint = url.fileURLToPath(new URL("./src/main", import.meta.url));
const aboutEntryPoint = url.fileURLToPath(new URL("./src/about", import.meta.url));
const outdir = url.fileURLToPath(new URL("./dist", import.meta.url));
const srcDir = url.fileURLToPath(new URL("./src", import.meta.url));

const { metafile } = await esbuild.build({
  bundle: true,
  entryPoints: [entryPoint, aboutEntryPoint],
  format: "esm",
  metafile: true,
  minify: true,
  outdir,
  plugins: [
    copyPlugin({
      src: srcDir,
      dest: outdir,
      patterns: ["*.html", "*.rb", "assets/**/*", "*.css", "problems.js", "problems/**/*.js"],
    }),
  ],
  sourcemap: true,
  splitting: true,
  target: "esnext",
  loader: {
    ".ttf": "file",
  },
});

const analysis = await esbuild.analyzeMetafile(metafile);
console.log(analysis);
