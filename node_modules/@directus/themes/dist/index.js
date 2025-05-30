import { computed as y, unref as f, reactive as B, defineComponent as $, toRefs as D, createBlock as G, openBlock as T, Teleport as _, createTextVNode as L, toDisplayString as M } from "vue";
import { useHead as N } from "@unhead/vue";
import { get as W, merge as w, mapKeys as E } from "lodash-es";
import { defineStore as U, storeToRefs as I } from "pinia";
import P from "decamelize";
import { flatten as V } from "flat";
import { cssVar as z } from "@directus/utils/browser";
import { Type as e } from "@sinclair/typebox";
const r = e.String({ $id: "Color" }), i = e.String({ $id: "FamilyName" }), b = e.String({ $id: "FontWeight" }), h = e.String({ $id: "Length" }), p = e.String({ $id: "Percentage" }), k = e.String({ $id: "BoxShadow" }), j = e.String({ $id: "Number" }), H = e.String({ $id: "Size" }), s = e.Union([e.String(), e.Literal("thin"), e.Literal("medium"), e.Literal("thick")], {
  $id: "LineWidth"
}), S = e.Optional(
  e.Object({
    columnGap: e.Optional(e.Union([e.Ref(h), e.Ref(p)])),
    rowGap: e.Optional(e.Union([e.Ref(h), e.Ref(p)])),
    field: e.Optional(
      e.Object({
        label: e.Optional(
          e.Object({
            foreground: e.Optional(e.Ref(r)),
            fontFamily: e.Optional(e.Ref(i)),
            fontWeight: e.Optional(e.Ref(b))
          })
        ),
        input: e.Optional(
          e.Object({
            background: e.Optional(e.Ref(r)),
            backgroundSubdued: e.Optional(e.Ref(r)),
            foreground: e.Optional(e.Ref(r)),
            foregroundSubdued: e.Optional(e.Ref(r)),
            borderColor: e.Optional(e.Ref(r)),
            borderColorHover: e.Optional(e.Ref(r)),
            borderColorFocus: e.Optional(e.Ref(r)),
            boxShadow: e.Optional(e.Ref(k)),
            boxShadowHover: e.Optional(e.Ref(k)),
            boxShadowFocus: e.Optional(e.Ref(k)),
            height: e.Optional(e.Ref(H)),
            padding: e.Optional(e.Union([e.Ref(h), e.Ref(p)]))
          })
        )
      })
    )
  })
), K = e.Object({
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Base border styles
  borderRadius: e.Optional(e.Union([e.Ref(h), e.Ref(p)])),
  borderWidth: e.Optional(e.Ref(s)),
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Base color palette
  foreground: e.Optional(e.Ref(r)),
  foregroundSubdued: e.Optional(e.Ref(r)),
  foregroundAccent: e.Optional(e.Ref(r)),
  background: e.Optional(e.Ref(r)),
  backgroundNormal: e.Optional(e.Ref(r)),
  backgroundAccent: e.Optional(e.Ref(r)),
  backgroundSubdued: e.Optional(e.Ref(r)),
  borderColor: e.Optional(e.Ref(r)),
  borderColorAccent: e.Optional(e.Ref(r)),
  borderColorSubdued: e.Optional(e.Ref(r)),
  primary: e.Optional(e.Ref(r)),
  primaryBackground: e.Optional(e.Ref(r)),
  primarySubdued: e.Optional(e.Ref(r)),
  primaryAccent: e.Optional(e.Ref(r)),
  secondary: e.Optional(e.Ref(r)),
  secondaryBackground: e.Optional(e.Ref(r)),
  secondarySubdued: e.Optional(e.Ref(r)),
  secondaryAccent: e.Optional(e.Ref(r)),
  success: e.Optional(e.Ref(r)),
  successBackground: e.Optional(e.Ref(r)),
  successSubdued: e.Optional(e.Ref(r)),
  successAccent: e.Optional(e.Ref(r)),
  warning: e.Optional(e.Ref(r)),
  warningBackground: e.Optional(e.Ref(r)),
  warningSubdued: e.Optional(e.Ref(r)),
  warningAccent: e.Optional(e.Ref(r)),
  danger: e.Optional(e.Ref(r)),
  dangerBackground: e.Optional(e.Ref(r)),
  dangerSubdued: e.Optional(e.Ref(r)),
  dangerAccent: e.Optional(e.Ref(r)),
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Base fonts
  fonts: e.Optional(
    e.Object({
      display: e.Optional(
        e.Object({
          fontFamily: e.Optional(e.Ref(i)),
          fontWeight: e.Optional(e.Ref(b))
        })
      ),
      sans: e.Optional(
        e.Object({
          fontFamily: e.Optional(e.Ref(i)),
          fontWeight: e.Optional(e.Ref(b))
        })
      ),
      serif: e.Optional(
        e.Object({
          fontFamily: e.Optional(e.Ref(i)),
          fontWeight: e.Optional(e.Ref(b))
        })
      ),
      monospace: e.Optional(
        e.Object({
          fontFamily: e.Optional(e.Ref(i)),
          fontWeight: e.Optional(e.Ref(b))
        })
      )
    })
  ),
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Scopes
  navigation: e.Optional(
    e.Object({
      background: e.Optional(e.Ref(r)),
      backgroundAccent: e.Optional(e.Ref(r)),
      borderWidth: e.Optional(e.Ref(s)),
      borderColor: e.Optional(e.Ref(r)),
      project: e.Optional(
        e.Object({
          background: e.Optional(e.Ref(r)),
          foreground: e.Optional(e.Ref(r)),
          fontFamily: e.Optional(e.Ref(i)),
          borderWidth: e.Optional(e.Ref(s)),
          borderColor: e.Optional(e.Ref(r))
        })
      ),
      modules: e.Optional(
        e.Object({
          background: e.Optional(e.Ref(r)),
          borderWidth: e.Optional(e.Ref(s)),
          borderColor: e.Optional(e.Ref(r)),
          button: e.Optional(
            e.Object({
              foreground: e.Optional(e.Ref(r)),
              foregroundHover: e.Optional(e.Ref(r)),
              foregroundActive: e.Optional(e.Ref(r)),
              background: e.Optional(e.Ref(r)),
              backgroundHover: e.Optional(e.Ref(r)),
              backgroundActive: e.Optional(e.Ref(r))
            })
          )
        })
      ),
      list: e.Optional(
        e.Object({
          icon: e.Optional(
            e.Object({
              foreground: e.Optional(e.Ref(r)),
              foregroundHover: e.Optional(e.Ref(r)),
              foregroundActive: e.Optional(e.Ref(r))
            })
          ),
          foreground: e.Optional(e.Ref(r)),
          foregroundHover: e.Optional(e.Ref(r)),
          foregroundActive: e.Optional(e.Ref(r)),
          background: e.Optional(e.Ref(r)),
          backgroundHover: e.Optional(e.Ref(r)),
          backgroundActive: e.Optional(e.Ref(r)),
          fontFamily: e.Optional(e.Ref(i)),
          divider: e.Object({
            borderColor: e.Optional(e.Ref(r)),
            borderWidth: e.Optional(e.Ref(s))
          })
        })
      )
    })
  ),
  header: e.Optional(
    e.Object({
      background: e.Optional(e.Ref(r)),
      borderWidth: e.Optional(e.Ref(s)),
      borderColor: e.Optional(e.Ref(r)),
      boxShadow: e.Optional(e.Ref(k)),
      headline: e.Optional(
        e.Object({
          foreground: e.Optional(e.Ref(r)),
          fontFamily: e.Optional(e.Ref(i))
        })
      ),
      title: e.Optional(
        e.Object({
          foreground: e.Optional(e.Ref(r)),
          fontFamily: e.Optional(e.Ref(i)),
          fontWeight: e.Optional(e.Ref(b))
        })
      )
    })
  ),
  form: S,
  sidebar: e.Optional(
    e.Object({
      background: e.Optional(e.Ref(r)),
      foreground: e.Optional(e.Ref(r)),
      fontFamily: e.Optional(e.Ref(i)),
      borderWidth: e.Optional(e.Ref(s)),
      borderColor: e.Optional(e.Ref(r)),
      section: e.Optional(
        e.Object({
          toggle: e.Optional(
            e.Object({
              icon: e.Optional(
                e.Object({
                  foreground: e.Optional(e.Ref(r)),
                  foregroundHover: e.Optional(e.Ref(r)),
                  foregroundActive: e.Optional(e.Ref(r))
                })
              ),
              foreground: e.Optional(e.Ref(r)),
              foregroundHover: e.Optional(e.Ref(r)),
              foregroundActive: e.Optional(e.Ref(r)),
              background: e.Optional(e.Ref(r)),
              backgroundHover: e.Optional(e.Ref(r)),
              backgroundActive: e.Optional(e.Ref(r)),
              fontFamily: e.Optional(e.Ref(i)),
              borderWidth: e.Optional(e.Ref(s)),
              borderColor: e.Optional(e.Ref(r))
            })
          ),
          form: S
        })
      )
    })
  ),
  public: e.Optional(
    e.Object({
      background: e.Optional(e.Ref(r)),
      foreground: e.Optional(e.Ref(r)),
      foregroundAccent: e.Optional(e.Ref(r)),
      art: e.Optional(
        e.Object({
          background: e.Optional(e.Ref(r)),
          primary: e.Optional(e.Ref(r)),
          secondary: e.Optional(e.Ref(r)),
          speed: e.Optional(e.Ref(j))
        })
      ),
      form: S
    })
  ),
  popover: e.Optional(
    e.Object({
      menu: e.Optional(
        e.Object({
          background: e.Optional(e.Ref(r)),
          borderRadius: e.Optional(e.Optional(e.Union([e.Ref(h), e.Ref(p)]))),
          boxShadow: e.Optional(e.Ref(k))
        })
      )
    })
  ),
  banner: e.Optional(
    e.Object({
      background: e.Optional(e.Ref(r)),
      padding: e.Optional(e.Union([e.Ref(h), e.Ref(p)])),
      borderRadius: e.Optional(e.Optional(e.Union([e.Ref(h), e.Ref(p)]))),
      avatar: e.Optional(
        e.Object({
          background: e.Optional(e.Ref(r)),
          foreground: e.Optional(e.Ref(r)),
          borderRadius: e.Optional(e.Optional(e.Union([e.Ref(h), e.Ref(p)])))
        })
      ),
      headline: e.Optional(
        e.Object({
          foreground: e.Optional(e.Ref(r)),
          fontFamily: e.Optional(e.Ref(i)),
          fontWeight: e.Optional(e.Ref(b))
        })
      ),
      title: e.Optional(
        e.Object({
          foreground: e.Optional(e.Ref(r)),
          fontFamily: e.Optional(e.Ref(i)),
          fontWeight: e.Optional(e.Ref(b))
        })
      ),
      subtitle: e.Optional(
        e.Object({
          foreground: e.Optional(e.Ref(r)),
          fontFamily: e.Optional(e.Ref(i)),
          fontWeight: e.Optional(e.Ref(b))
        })
      ),
      art: e.Optional(
        e.Object({
          foreground: e.Optional(e.Ref(r))
        })
      )
    })
  )
}), Q = e.Object({
  id: e.String(),
  name: e.String(),
  appearance: e.Union([e.Literal("light"), e.Literal("dark")]),
  rules: K
}), le = {
  $defs: {
    Color: r,
    FamilyName: i,
    Length: h,
    Percentage: p,
    LineWidth: s,
    BoxShadow: k,
    Size: H,
    Number: j
  }
}, q = (d) => {
  const v = y(() => {
    const o = /* @__PURE__ */ new Map(), c = (m, t = []) => {
      for (const [a, n] of Object.entries(m))
        typeof n == "object" && n !== null && ("type" in n && n.type === "object" && "properties" in n && c(n.properties, [...t, a]), "$ref" in n && n.$ref === "FamilyName" && (o.has(t) ? o.set(t, { family: a, weight: o.get(t).weight }) : o.set(t, { family: a, weight: null })), "$ref" in n && n.$ref === "FontWeight" && (o.has(t) ? o.set(t, { family: o.get(t).family, weight: a }) : o.set(t, { family: null, weight: a })));
    };
    return c(Q.properties.rules.properties), o;
  }), u = y(() => {
    const o = /* @__PURE__ */ new Map();
    for (const [c, { family: m, weight: t }] of v.value.entries()) {
      let a = null, n = null;
      if (m && (a = W(f(d).rules, [...c, m])), t && (n = W(f(d).rules, [...c, t])), a) {
        const F = a.split(",");
        for (const l of F) {
          const g = l.trim();
          if (g.startsWith("var(--")) {
            F.push(z(g.slice(6, -1)));
            continue;
          }
          if ((g.startsWith('"') && g.endsWith('"')) === !1)
            continue;
          const x = g.slice(1, -1);
          o.has(x) ? o.get(x).add(n ?? "400") : o.set(x, /* @__PURE__ */ new Set([n ?? "400"]));
        }
      }
    }
    return o;
  });
  return { googleFonts: y(() => {
    const o = [];
    for (const [c, m] of u.value.entries())
      if (["Inter", "Merriweather", "Fira Mono"].includes(c) === !1) {
        const a = Array.from(m).join(";");
        o.push(`${c.replace(" ", "+")}:wght@${a}`);
      }
    return o;
  }) };
}, R = (d) => d, A = R({
  id: "Directus Default",
  name: "$t:theme_directus_default",
  appearance: "dark",
  rules: {
    borderRadius: "6px",
    borderWidth: "2px",
    foreground: "#c9d1d9",
    foregroundAccent: "#f0f6fc",
    foregroundSubdued: "#666672",
    background: "#0d1117",
    backgroundNormal: "#21262e",
    backgroundAccent: "#30363d",
    backgroundSubdued: "#161b22",
    borderColor: "#21262e",
    borderColorAccent: "#30363d",
    borderColorSubdued: "#21262d",
    primary: "var(--project-color)",
    primaryBackground: "color-mix(in srgb, var(--theme--background), var(--theme--primary) 10%)",
    primarySubdued: "color-mix(in srgb, var(--theme--background), var(--theme--primary) 50%)",
    primaryAccent: "color-mix(in srgb, var(--theme--primary), #16151a 25%)",
    secondary: "#ff99dd",
    secondaryBackground: "color-mix(in srgb, var(--theme--background), var(--theme--secondary) 10%)",
    secondarySubdued: "color-mix(in srgb, var(--theme--background), var(--theme--secondary) 50%)",
    secondaryAccent: "color-mix(in srgb, var(--theme--secondary), #16151a 25%)",
    success: "#2ecda7",
    successBackground: "color-mix(in srgb, var(--theme--background), var(--theme--success) 10%)",
    successSubdued: "color-mix(in srgb, var(--theme--background), var(--theme--success) 50%)",
    successAccent: "color-mix(in srgb, var(--theme--success), #16151a 25%)",
    warning: "#ffa439",
    warningBackground: "color-mix(in srgb, var(--theme--background), var(--theme--warning) 10%)",
    warningSubdued: "color-mix(in srgb, var(--theme--background), var(--theme--warning) 50%)",
    warningAccent: "color-mix(in srgb, var(--theme--warning), #16151a 25%)",
    danger: "#e35169",
    dangerBackground: "color-mix(in srgb, var(--theme--background), var(--theme--danger) 10%)",
    dangerSubdued: "color-mix(in srgb, var(--theme--background), var(--theme--danger) 50%)",
    dangerAccent: "color-mix(in srgb, var(--theme--danger), #16151a 25%)",
    fonts: {
      display: {
        fontFamily: '"Inter", system-ui',
        fontWeight: "700"
      },
      sans: {
        fontFamily: '"Inter", system-ui',
        fontWeight: "500"
      },
      serif: {
        fontFamily: '"Merriweather", serif',
        fontWeight: "500"
      },
      monospace: {
        fontFamily: '"Fira Mono", monospace',
        fontWeight: "500"
      }
    },
    navigation: {
      background: "#21262e",
      backgroundAccent: "#30363d",
      borderColor: "transparent",
      borderWidth: "0px",
      project: {
        borderColor: "transparent",
        borderWidth: "0px",
        background: "#30363d",
        foreground: "var(--theme--foreground-accent)",
        fontFamily: "var(--theme--fonts--sans--font-family)"
      },
      modules: {
        background: "var(--theme--background)",
        borderColor: "transparent",
        borderWidth: "0px",
        button: {
          foreground: "var(--theme--foreground-subdued)",
          foregroundHover: "#fff",
          foregroundActive: "var(--theme--foreground-accent)",
          background: "transparent",
          backgroundHover: "transparent",
          backgroundActive: "#21262e"
        }
      },
      list: {
        icon: {
          foreground: "var(--theme--primary)",
          foregroundHover: "var(--theme--navigation--list--icon--foreground)",
          foregroundActive: "var(--theme--navigation--list--icon--foreground)"
        },
        foreground: "var(--theme--foreground-accent)",
        foregroundHover: "var(--theme--navigation--list--foreground)",
        foregroundActive: "var(--theme--navigation--list--foreground)",
        background: "transparent",
        backgroundHover: "#30363d",
        backgroundActive: "#30363d",
        fontFamily: "var(--theme--fonts--sans--font-family)",
        divider: {
          borderColor: "#30363d",
          borderWidth: "var(--theme--border-width)"
        }
      }
    },
    header: {
      background: "var(--theme--background)",
      borderColor: "transparent",
      borderWidth: "0px",
      boxShadow: "0 4px 7px -4px black",
      headline: {
        foreground: "var(--theme--foreground-subdued)",
        fontFamily: "var(--theme--fonts--sans--font-family)"
      },
      title: {
        foreground: "var(--theme--foreground-accent)",
        fontFamily: "var(--theme--fonts--display--font-family)",
        fontWeight: "var(--theme--fonts--display--font-weight)"
      }
    },
    form: {
      columnGap: "32px",
      rowGap: "40px",
      field: {
        label: {
          foreground: "var(--theme--foreground-accent)",
          fontFamily: "var(--theme--fonts--sans--font-family)",
          fontWeight: "600"
        },
        input: {
          background: "var(--theme--background)",
          backgroundSubdued: "var(--theme--background-subdued)",
          foreground: "var(--theme--foreground)",
          foregroundSubdued: "var(--theme--foreground-subdued)",
          borderColor: "#21262e",
          borderColorHover: "#30363d",
          borderColorFocus: "var(--theme--primary)",
          boxShadow: "none",
          boxShadowHover: "none",
          boxShadowFocus: "0 0 16px -8px var(--theme--primary)",
          height: "60px",
          padding: "16px"
        }
      }
    },
    sidebar: {
      background: "#21262e",
      foreground: "var(--theme--foreground-subdued)",
      fontFamily: "var(--theme--fonts--sans--font-family)",
      borderColor: "transparent",
      borderWidth: "0px",
      section: {
        toggle: {
          icon: {
            foreground: "var(--theme--foreground-accent)",
            foregroundHover: "var(--theme--sidebar--section--toggle--icon--foreground)",
            foregroundActive: "var(--theme--sidebar--section--toggle--icon--foreground)"
          },
          foreground: "var(--theme--foreground-accent)",
          foregroundHover: "var(--theme--sidebar--section--toggle--foreground)",
          foregroundActive: "var(--theme--sidebar--section--toggle--foreground)",
          background: "#30363d",
          backgroundHover: "var(--theme--sidebar--section--toggle--background)",
          backgroundActive: "var(--theme--sidebar--section--toggle--background)",
          fontFamily: "var(--theme--fonts--sans--font-family)",
          borderColor: "transparent",
          borderWidth: "0px"
        },
        form: {
          columnGap: "var(--theme--form--column-gap)",
          rowGap: "var(--theme--form--row-gap)",
          label: {
            foreground: "var(--theme--form--field--label--foreground)",
            fontFamily: "var(--theme--form--field--label--font-family)"
          },
          field: {
            input: {
              background: "var(--theme--form--field--input--background)",
              foreground: "var(--theme--form--field--input--foreground)",
              foregroundSubdued: "var(--theme--form--field--input--foreground-subdued)",
              borderColor: "var(--theme--form--field--input--border-color)",
              borderColorHover: "var(--theme--form--field--input--border-color-hover)",
              borderColorFocus: "var(--theme--form--field--input--border-color-focus)",
              boxShadow: "var(--theme--form--field--input--box-shadow)",
              boxShadowHover: "var(--theme--form--field--input--box-shadow-hover)",
              boxShadowFocus: "var(--theme--form--field--input--box-shadow-focus)",
              height: "52px",
              padding: "12px"
            }
          }
        }
      }
    },
    public: {
      background: "var(--theme--background)",
      foreground: "var(--theme--foreground)",
      foregroundAccent: "var(--theme--foreground-accent)",
      art: {
        background: "#0e1c2f",
        primary: "var(--theme--primary)",
        secondary: "var(--theme--secondary)",
        speed: "1"
      },
      form: {
        columnGap: "var(--theme--form--column-gap)",
        rowGap: "var(--theme--form--row-gap)",
        field: {
          label: {
            foreground: "var(--theme--form--field--label--foreground)",
            fontFamily: "var(--theme--form--field--label--font-family)"
          },
          input: {
            background: "var(--theme--form--field--input--background)",
            foreground: "var(--theme--form--field--input--foreground)",
            foregroundSubdued: "var(--theme--form--field--input--foreground-subdued)",
            borderColor: "var(--theme--form--field--input--border-color)",
            borderColorHover: "var(--theme--form--field--input--border-color-hover)",
            borderColorFocus: "var(--theme--form--field--input--border-color-focus)",
            boxShadow: "var(--theme--form--field--input--box-shadow)",
            boxShadowHover: "var(--theme--form--field--input--box-shadow-hover)",
            boxShadowFocus: "var(--theme--form--field--input--box-shadow-focus)",
            height: "var(--theme--form--field--input--height)",
            padding: "var(--theme--form--field--input--padding)"
          }
        }
      }
    },
    popover: {
      menu: {
        background: "#161b22",
        borderRadius: "var(--theme--border-radius)",
        boxShadow: "0px 0px 6px 0px black"
      }
    },
    banner: {
      background: "#0e1c2f",
      padding: "40px",
      borderRadius: "var(--theme--border-radius)",
      avatar: {
        borderRadius: "50%",
        foreground: "var(--theme--primary)",
        background: "#ffffff"
      },
      headline: {
        foreground: "#ffffff",
        fontFamily: "var(--theme--fonts--sans--font-family)",
        fontWeight: "var(--theme--fonts--sans--font-weight)"
      },
      title: {
        foreground: "#ffffff",
        fontFamily: "var(--theme--fonts--display--font-family)",
        fontWeight: "var(--theme--fonts--display--font-weight)"
      },
      subtitle: {
        foreground: "#a2b5cd",
        fontFamily: "var(--theme--fonts--monospace--font-family)",
        fontWeight: "var(--theme--fonts--monospace--font-weight)"
      },
      art: {
        foreground: "#2e3a4d"
      }
    }
  }
}), J = R({
  id: "Directus Color Match",
  name: "$t:theme_directus_colormatch",
  appearance: "light",
  rules: {
    background: "color-mix(in srgb, #FFFFFF, var(--theme--primary) 7%)",
    backgroundAccent: "color-mix(in srgb, #FFFFFF, var(--theme--primary) 20%)",
    backgroundNormal: "color-mix(in srgb, #FFFFFF, var(--theme--primary) 15%)",
    backgroundSubdued: "color-mix(in srgb, #FFFFFF, var(--theme--primary) 10%)",
    borderColor: "color-mix(in srgb, #FFFFFF, var(--theme--primary) 20%)",
    borderColorAccent: "color-mix(in srgb, #FFFFFF, var(--theme--primary) 40%)",
    borderColorSubdued: "color-mix(in srgb, #FFFFFF, var(--theme--primary) 15%)",
    borderRadius: "12px",
    borderWidth: "1px",
    foreground: "color-mix(in srgb, #000000, var(--theme--primary) 70%)",
    foregroundAccent: "color-mix(in srgb, #000000, var(--theme--primary) 50%)",
    foregroundSubdued: "color-mix(in srgb, #FFFFFF, var(--theme--primary) 60%)",
    fonts: {
      display: {
        fontFamily: '"Montserrat", system-ui',
        fontWeight: "400"
      }
    },
    form: {
      field: {
        input: { background: "#FFFFFF", backgroundSubdued: "color-mix(in srgb, #FFFFFF, var(--theme--primary) 13%)" }
      }
    },
    navigation: {
      background: "#FFFFFF",
      backgroundAccent: "var(--theme--background)",
      borderWidth: "var(--theme--border-width)",
      borderColor: "var(--theme--border-color-subdued)",
      modules: {
        background: "color-mix(in srgb, #000000, var(--theme--primary) 90%)",
        button: {
          backgroundActive: "#FFFFFF",
          foreground: "color-mix(in srgb, #FFFFFF, var(--theme--primary) 20%)",
          foregroundActive: "var(--theme--primary)"
        }
      },
      project: { borderWidth: "1px", background: "#FFFFFF", borderColor: "var(--theme--border-color-subdued)" },
      list: {
        divider: { borderColor: "var(--theme--border-color-subdued)" },
        icon: { foreground: "var(--theme--foreground)" },
        foreground: "var(--theme--foreground)",
        foregroundHover: "var(--theme--foreground)",
        foregroundActive: "var(--theme--foreground)"
      }
    },
    header: {
      background: "#FFFFFF",
      borderWidth: "1px",
      borderColor: "var(--theme--border-color-subdued)",
      boxShadow: "0 4px 7px -4px rgba(0,102,102, 0.2)"
    },
    sidebar: {
      background: "#FFFFFF",
      borderWidth: "1px",
      borderColor: "var(--theme--border-color-subdued)",
      section: {
        toggle: {
          borderColor: "var(--theme--border-color-subdued)",
          borderWidth: "1px",
          background: "#FFFFFF",
          foreground: "var(--theme--foreground)",
          foregroundHover: "var(--theme--foreground)",
          foregroundActive: "var(--theme--foreground-accent)",
          icon: {
            foreground: "var(--theme--foreground)",
            foregroundHover: "var(--theme--foreground)",
            foregroundActive: "var(--theme--foreground-accent)"
          }
        }
      }
    },
    public: {
      art: {
        background: "color-mix(in srgb, #FFFFFF, var(--theme--primary) 10%)",
        primary: "color-mix(in srgb, #FFFFFF, var(--theme--primary) 60%)",
        secondary: "color-mix(in srgb, #FFFFFF, var(--theme--secondary) 70%)"
      },
      background: "#FFFFFF"
    }
  }
}), C = R({
  id: "Directus Default",
  name: "$t:theme_directus_default",
  appearance: "light",
  rules: {
    borderRadius: "6px",
    borderWidth: "2px",
    foreground: "#4f5464",
    foregroundAccent: "#172940",
    foregroundSubdued: "#a2b5cd",
    background: "#fff",
    backgroundNormal: "#f0f4f9",
    backgroundAccent: "#e4eaf1",
    backgroundSubdued: "#f7fafc",
    borderColor: "#e4eaf1",
    borderColorAccent: "#d3dae4",
    borderColorSubdued: "#f0f4f9",
    primary: "var(--project-color)",
    primaryBackground: "color-mix(in srgb, var(--theme--background), var(--theme--primary) 10%)",
    primarySubdued: "color-mix(in srgb, var(--theme--background), var(--theme--primary) 50%)",
    primaryAccent: "color-mix(in srgb, var(--theme--primary), #2e3c43 25%)",
    secondary: "#ff99dd",
    secondaryBackground: "color-mix(in srgb, var(--theme--background), var(--theme--secondary) 10%)",
    secondarySubdued: "color-mix(in srgb, var(--theme--background), var(--theme--secondary) 50%)",
    secondaryAccent: "color-mix(in srgb, var(--theme--secondary), #2e3c43 25%)",
    success: "#2ecda7",
    successBackground: "color-mix(in srgb, var(--theme--background), var(--theme--success) 10%)",
    successSubdued: "color-mix(in srgb, var(--theme--background), var(--theme--success) 50%)",
    successAccent: "color-mix(in srgb, var(--theme--success), #2e3c43 25%)",
    warning: "#ffa439",
    warningBackground: "color-mix(in srgb, var(--theme--background), var(--theme--warning) 10%)",
    warningSubdued: "color-mix(in srgb, var(--theme--background), var(--theme--warning) 50%)",
    warningAccent: "color-mix(in srgb, var(--theme--warning), #2e3c43 25%)",
    danger: "#e35169",
    dangerBackground: "color-mix(in srgb, var(--theme--background), var(--theme--danger) 10%)",
    dangerSubdued: "color-mix(in srgb, var(--theme--background), var(--theme--danger) 50%)",
    dangerAccent: "color-mix(in srgb, var(--theme--danger), #2e3c43 25%)",
    fonts: {
      display: {
        fontFamily: '"Inter", system-ui',
        fontWeight: "700"
      },
      sans: {
        fontFamily: '"Inter", system-ui',
        fontWeight: "500"
      },
      serif: {
        fontFamily: '"Merriweather", serif',
        fontWeight: "500"
      },
      monospace: {
        fontFamily: '"Fira Mono", monospace',
        fontWeight: "500"
      }
    },
    navigation: {
      background: "var(--theme--background-normal)",
      backgroundAccent: "var(--theme--background-accent)",
      borderColor: "transparent",
      borderWidth: "0px",
      project: {
        borderColor: "transparent",
        borderWidth: "0px",
        background: "var(--theme--navigation--background-accent)",
        foreground: "var(--theme--foreground-accent)",
        fontFamily: "var(--theme--font-family-sans-serif)"
      },
      modules: {
        background: "#0e1c2f",
        borderColor: "transparent",
        borderWidth: "0px",
        button: {
          foreground: "#8196b1",
          foregroundHover: "#fff",
          foregroundActive: "var(--theme--foreground-accent)",
          background: "transparent",
          backgroundHover: "transparent",
          backgroundActive: "var(--theme--background-normal)"
        }
      },
      list: {
        icon: {
          foreground: "var(--theme--primary)",
          foregroundHover: "var(--theme--navigation--list--icon--foreground)",
          foregroundActive: "var(--theme--navigation--list--icon--foreground)"
        },
        foreground: "var(--theme--foreground-accent)",
        foregroundHover: "var(--theme--navigation--list--foreground)",
        foregroundActive: "var(--theme--navigation--list--foreground)",
        background: "transparent",
        backgroundHover: "var(--theme--navigation--background-accent)",
        backgroundActive: "var(--theme--navigation--background-accent)",
        fontFamily: "var(--theme--fonts--sans--font-family)",
        divider: {
          borderColor: "var(--theme--border-color-accent)",
          borderWidth: "var(--theme--border-width)"
        }
      }
    },
    header: {
      background: "var(--theme--background)",
      borderColor: "transparent",
      borderWidth: "0px",
      boxShadow: "0 4px 7px -4px rgb(0 0 0 / 0.2)",
      headline: {
        foreground: "var(--theme--foreground-subdued)",
        fontFamily: "var(--theme--fonts--sans--font-family)"
      },
      title: {
        foreground: "var(--theme--foreground-accent)",
        fontFamily: "var(--theme--fonts--display--font-family)",
        fontWeight: "var(--theme--fonts--display--font-weight)"
      }
    },
    form: {
      columnGap: "32px",
      rowGap: "40px",
      field: {
        label: {
          foreground: "var(--theme--foreground-accent)",
          fontFamily: "var(--theme--fonts--sans--font-family)",
          fontWeight: "600"
        },
        input: {
          background: "var(--theme--background)",
          backgroundSubdued: "var(--theme--background-subdued)",
          foreground: "var(--theme--foreground)",
          foregroundSubdued: "var(--theme--foreground-subdued)",
          borderColor: "var(--theme--border-color)",
          borderColorHover: "var(--theme--border-color-accent)",
          borderColorFocus: "var(--theme--primary)",
          boxShadow: "none",
          boxShadowHover: "none",
          boxShadowFocus: "0 0 16px -8px var(--theme--primary)",
          height: "60px",
          padding: "16px"
        }
      }
    },
    sidebar: {
      background: "var(--theme--background-normal)",
      foreground: "var(--theme--foreground-subdued)",
      fontFamily: "var(--theme--fonts--sans--font-family)",
      borderColor: "transparent",
      borderWidth: "0px",
      section: {
        toggle: {
          icon: {
            foreground: "var(--theme--foreground-accent)",
            foregroundHover: "var(--theme--sidebar--section--toggle--icon--foreground)",
            foregroundActive: "var(--theme--sidebar--section--toggle--icon--foreground)"
          },
          foreground: "var(--theme--foreground-accent)",
          foregroundHover: "var(--theme--sidebar--section--toggle--foreground)",
          foregroundActive: "var(--theme--sidebar--section--toggle--foreground)",
          background: "var(--theme--background-accent)",
          backgroundHover: "var(--theme--sidebar--section--toggle--background)",
          backgroundActive: "var(--theme--sidebar--section--toggle--background)",
          fontFamily: "var(--theme--fonts--sans--font-family)",
          borderColor: "transparent",
          borderWidth: "0px"
        },
        form: {
          columnGap: "var(--theme--form--column-gap)",
          rowGap: "var(--theme--form--row-gap)",
          label: {
            foreground: "var(--theme--form--field--label--foreground)",
            fontFamily: "var(--theme--form--field--label--font-family)"
          },
          field: {
            input: {
              background: "var(--theme--form--field--input--background)",
              foreground: "var(--theme--form--field--input--foreground)",
              foregroundSubdued: "var(--theme--form--field--input--foreground-subdued)",
              borderColor: "var(--theme--form--field--input--border-color)",
              borderColorHover: "var(--theme--form--field--input--border-color-hover)",
              borderColorFocus: "var(--theme--form--field--input--border-color-focus)",
              boxShadow: "var(--theme--form--field--input--box-shadow)",
              boxShadowHover: "var(--theme--form--field--input--box-shadow-hover)",
              boxShadowFocus: "var(--theme--form--field--input--box-shadow-focus)",
              height: "52px",
              padding: "12px"
            }
          }
        }
      }
    },
    public: {
      background: "var(--theme--background)",
      foreground: "var(--theme--foreground)",
      foregroundAccent: "var(--theme--foreground-accent)",
      art: {
        background: "#0e1c2f",
        primary: "var(--theme--primary)",
        secondary: "var(--theme--secondary)",
        speed: "1"
      },
      form: {
        columnGap: "var(--theme--form--column-gap)",
        rowGap: "var(--theme--form--row-gap)",
        label: {
          foreground: "var(--theme--form--field--label--foreground)",
          fontFamily: "var(--theme--form--field--label--font-family)"
        },
        field: {
          input: {
            background: "var(--theme--form--field--input--background)",
            foreground: "var(--theme--form--field--input--foreground)",
            foregroundSubdued: "var(--theme--form--field--input--foreground-subdued)",
            borderColor: "var(--theme--form--field--input--border-color)",
            borderColorHover: "var(--theme--form--field--input--border-color-hover)",
            borderColorFocus: "var(--theme--form--field--input--border-color-focus)",
            boxShadow: "var(--theme--form--field--input--box-shadow)",
            boxShadowHover: "var(--theme--form--field--input--box-shadow-hover)",
            boxShadowFocus: "var(--theme--form--field--input--box-shadow-focus)",
            height: "var(--theme--form--field--input--height)",
            padding: "var(--theme--form--field--input--padding)"
          }
        }
      }
    },
    popover: {
      menu: {
        background: "#fafcfd",
        borderRadius: "var(--theme--border-radius)",
        boxShadow: "0px 0px 6px 0px rgb(23, 41, 64, 0.2), 0px 0px 12px 2px rgb(23, 41, 64, 0.05)"
      }
    },
    banner: {
      background: "#0e1c2f",
      padding: "40px",
      borderRadius: "var(--theme--border-radius)",
      avatar: {
        borderRadius: "50%",
        foreground: "var(--theme--primary)",
        background: "#ffffff"
      },
      headline: {
        foreground: "#ffffff",
        fontFamily: "var(--theme--fonts--sans--font-family)",
        fontWeight: "var(--theme--fonts--sans--font-weight)"
      },
      title: {
        foreground: "#ffffff",
        fontFamily: "var(--theme--fonts--display--font-family)",
        fontWeight: "var(--theme--fonts--display--font-weight)"
      },
      subtitle: {
        foreground: "#a2b5cd",
        fontFamily: "var(--theme--fonts--monospace--font-family)",
        fontWeight: "var(--theme--fonts--monospace--font-weight)"
      },
      art: {
        foreground: "#2e3a4d"
      }
    }
  }
}), X = R({
  id: "Directus Minimal",
  name: "$t:theme_directus_minimal",
  appearance: "light",
  rules: {
    borderWidth: "1px",
    backgroundPage: "color-mix(in srgb, #FFFFFF, var(--theme--primary) 7%)",
    navigation: {
      background: "#FFFFFF",
      modules: {
        background: "#FFFFFF",
        button: {
          backgroundActive: "#F1F5F9",
          foreground: "var(--theme--foreground)",
          foregroundHover: "var(--theme--primary)",
          foregroundActive: "var(--theme--primary)",
          backgroundHover: "#F1F5F9",
          background: "#FFFFFF"
        },
        borderWidth: "1px",
        borderColor: "var(--theme--border-color)"
      },
      project: {
        borderWidth: "1px",
        background: "#FFFFFF",
        borderColor: "var(--theme--border-color)"
      },
      list: {
        icon: {
          foreground: "#0F172A"
        },
        divider: {
          borderColor: "var(--theme--border-color)"
        }
      },
      borderWidth: "1px",
      backgroundAccent: "#F1F5F9",
      borderColor: "var(--theme--border-color)"
    },
    header: {
      background: "#FFFFFF",
      borderWidth: "1px",
      borderColor: "var(--theme--border-color)",
      boxShadow: "0 4px 7px -4px rgba(0,102,102, 0.1)"
    },
    backgroundAccent: "#E2E8F0",
    backgroundSubdued: "#F8FAFC",
    background: "#FFFFFF",
    foreground: "#1E293B",
    foregroundAccent: "#0F172A",
    foregroundSubdued: "#94A3B8",
    borderRadius: "4px",
    borderColor: "#E2E8F0",
    borderColorAccent: "#CBD5E1",
    borderColorSubdued: "#F1F5F9",
    form: {
      rowGap: "32px",
      field: {
        input: {
          background: "#FFFFFF",
          backgroundSubdued: "#F8FAFC",
          boxShadowFocus: "none",
          height: "52px"
        }
      }
    },
    sidebar: {
      background: "#FFFFFF",
      borderWidth: "1px",
      borderColor: "var(--theme--border-color)",
      section: {
        toggle: {
          borderColor: "var(--theme--border-color)",
          borderWidth: "1px",
          background: "#FFFFFF",
          foreground: "var(--theme--foreground-subdued)",
          foregroundHover: "var(--theme--foreground)",
          foregroundActive: "var(--theme--foreground-accent)",
          icon: {
            foreground: "var(--theme--foreground)",
            foregroundHover: "var(--theme--foreground)",
            foregroundActive: "var(--theme--foreground-accent)"
          }
        },
        form: {
          field: {
            input: {
              height: "42px"
            }
          }
        }
      }
    },
    public: {
      art: {
        background: "color-mix(in srgb, #FFFFFF, var(--project-color) 10%)",
        primary: "color-mix(in srgb, #FFFFFF, var(--project-color) 70%)",
        secondary: "color-mix(in srgb, #FFFFFF, var(--project-color) 40%)"
      },
      background: "#FFFFFF"
    },
    backgroundNormal: "#F1F5F9",
    secondary: "#64748B",
    primary: "#0F172A",
    primaryBackground: "#F1F5F9",
    primarySubdued: "#F8FAFC",
    primaryAccent: "#E2E8F0",
    secondaryAccent: "#E2E8F0",
    secondaryBackground: "#F1F5F9",
    secondarySubdued: "#F8FAFC",
    fonts: {
      display: {
        fontFamily: "system-ui"
      }
    }
  }
}), Y = [A], Z = [C, X, J], ee = U("🎨 Themes", () => {
  const d = B({ light: Z, dark: Y });
  return { themes: d, registerTheme: (u) => {
    u.appearance === "light" ? d.light.push(u) : d.dark.push(u);
  } };
}), re = (d, v, u, O, o) => {
  const { themes: c } = I(ee());
  return { theme: y(() => {
    const t = f(d) ? f(u) : f(v), a = f(d) ? A : C, n = f(d) ? f(o) : f(O), F = f(c)[f(d) ? "dark" : "light"].find((l) => l.id === t);
    return F ? n ? w({}, a, F, { rules: n }) : w(a, F) : (t && t !== a.id && console.warn(`Theme "${t}" doesn't exist.`), n ? w({}, a, { rules: n }) : a);
  }) };
}, oe = (d) => {
  const v = V(d, { delimiter: "--" }), u = (O) => `--theme--${P(O, { separator: "-" })}`;
  return E(v, (O, o) => u(o));
}, ge = /* @__PURE__ */ $({
  __name: "theme-provider",
  props: {
    darkMode: { type: Boolean },
    themeLight: { default: C.name },
    themeLightOverrides: { default: () => ({}) },
    themeDark: { default: A.name },
    themeDarkOverrides: { default: () => ({}) }
  },
  setup(d) {
    const v = d, { darkMode: u, themeLight: O, themeDark: o, themeLightOverrides: c, themeDarkOverrides: m } = D(v), { theme: t } = re(u, O, o, c, m), a = y(() => oe(f(t).rules)), { googleFonts: n } = q(t);
    N({
      link: y(() => {
        let l = "";
        if (n.value.length > 0) {
          const g = n.value.join("&family=");
          l += `https://fonts.googleapis.com/css2?family=${g}`, l += `
`;
        }
        return l ? [
          {
            rel: "stylesheet",
            href: l
          }
        ] : [];
      })
    });
    const F = y(() => `:root {${Object.entries(f(a)).map(([g, x]) => `${g}: ${x};`).join(" ")}}`);
    return (l, g) => (T(), G(_, { to: "#theme" }, [
      L(M(F.value), 1)
    ]));
  }
});
export {
  le as Definitions,
  ge as ThemeProvider,
  Q as ThemeSchema,
  R as defineTheme,
  oe as rulesToCssVars,
  q as useFonts,
  re as useTheme,
  ee as useThemeStore
};
