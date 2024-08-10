import ignore from "ignore";
import path from "path";
import { nil, sf } from "sflow";

/**
 * globflow
 * @author: snomiao <snomiao@gmail.com>
 */
export default function globFlow(globs: string[]) {
  return sf(getIgnoreFilter())
    .map((ignoreFilter) =>
      sf(globs)
        .map((glob) =>
          sf(new Bun.Glob(glob).scan({ dot: true })).filter((f) =>
            ignoreFilter(f)
          )
        )
        .confluence()
    )
    .confluence();
}

/** emit: [filter()], use  */
async function getIgnoreFilter() {
  const defaultIgnore = ['.git']
  return await sf(new Bun.Glob("./.gitignore").scan({ dot: true }))
    .pMap(async (f) => [f, await Bun.file(f).text().catch(nil)] as const)
    .reduce(
      (map, [k, v]) => (v ? map.set(k, v) : (map.delete(k), map)),
      new Map<string, string>()
    )
    .tail(1)
    .map((ignoresMap) => {
      const filters = [...ignoresMap.entries()].map(([f, text]) => {
        // each ignore file applies to all sub folder
        const dir = path.dirname(f);
        const ignores = text.split("\n").concat(defaultIgnore);
        const filter = ignore().add(ignores).createFilter();
        return { dir, filter };
      });
      return function filter(f: string) {
        return filters.every(({ dir, filter }) => {
          const rel = path.relative(dir, f);
          if (rel.startsWith("..")) return true;
          return filter(rel);
        });
      };
    })
    .toAtLeastOne();
}
