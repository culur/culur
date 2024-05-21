// https://uvr.esm.is/guide/typescript.html#extra-types

declare module 'vue-router/auto/routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'unplugin-vue-router';

  export interface RouteNamedMap {}
}
