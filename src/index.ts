import { IStyleAPI, IStyleItem } from 'import-sort-style';

interface IImport {
  start: number;
  end: number;
  importStart?: number;
  importEnd?: number;
  type: ImportType;
  moduleName: string;
  defaultMember?: string;
  namespaceMember?: string;
  namedMembers: NamedMember[];
}

declare type ImportType = 'import' | 'require' | 'import-equals' | 'import-type';
declare type NamedMember = {
  name: string;
  alias: string;
};

export default function(styleApi: IStyleAPI): IStyleItem[] {
  const {
    alias,
    and,
    or,
    not,
    dotSegmentCount,
    hasNoMember,
    isAbsoluteModule,
    isNodeModule,
    isRelativeModule,
    moduleName,
    unicode,
    naturally
  } = styleApi;

  function isBaseModule(imported: IImport) {
    return imported.moduleName.startsWith('src/');
  }

  function isAliasModule(imported: IImport) {
    return imported.moduleName.startsWith('@/');
  }

  return [
    // import "foo"
    { match: and(hasNoMember, isAbsoluteModule) },
    { separator: true },

    // import "./foo"
    { match: and(hasNoMember, isRelativeModule) },
    { separator: true },

    // import … from "fs";
    {
      match: isNodeModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(naturally)
    },
    { separator: true },

    // import … from "foo";
    {
      match: and(isAbsoluteModule, not(isBaseModule), not(isAliasModule)),
      sort: moduleName(naturally),
      sortNamedMembers: alias(naturally)
    },
    { separator: true },

    // import … from "foo";
    {
      match: or(isBaseModule, isAliasModule),
      sort: moduleName(naturally),
      sortNamedMembers: alias(naturally)
    },
    { separator: true },

    // import … from "./foo";
    // import … from "../foo";
    {
      match: isRelativeModule,
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(naturally)
    },
    { separator: true }
  ];
}
