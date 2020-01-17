"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(styleApi) {
    const { alias, and, dotSegmentCount, hasNoMember, isAbsoluteModule, isNodeModule, isRelativeModule, moduleName, naturally, unicode, } = styleApi;
    return [
        { match: and(hasNoMember, isAbsoluteModule) },
        { separator: true },
        { match: and(hasNoMember, isRelativeModule) },
        { separator: true },
        {
            match: isNodeModule,
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
        {
            match: isAbsoluteModule,
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
        {
            match: isRelativeModule,
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode),
        },
        { separator: true },
    ];
}
exports.default = default_1;
