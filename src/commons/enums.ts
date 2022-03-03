enum TimeLevels {
  DayLevel = 'daylv',
  MinuteLevel = 'minlv',
  SnapLevel = 'snaplv',
}

enum Products {
  Day = 'DAY',
  Index = 'IDX',
  Basic = 'L1',
  Deep = 'L2',
  Otc = 'OTC',
}

enum Categories {
  Ftr = 'ftr',
  Opt = 'opt',
}

enum ItemLists {
  DaylvFtr = 'daylvFtr',
  DaylvOpt = 'daylvOpt',
  DaylvIdx = 'daylvIdx',
  SnaplvL1Ftr = 'snaplvL1Ftr',
  SnaplvL1Opt = 'snaplvL1Opt',
  SnaplvL2Ftr = 'snaplvL2Ftr',
  SnaplvL2Opt = 'snaplvL2Opt',
  SnaplvIdx = 'snaplvIdx',
  SnaplvOtc = 'snaplvOtc',
  MinlvL1Ftr = 'minlvL1Ftr',
  MinlvL1Opt = 'minlvL1Opt',
  MinlvL2Ftr = 'minlvL2Ftr',
  MinlvL2Opt = 'minlvL2Opt',
  MinlvIdx = 'minlvIdx',
}

enum ItemGroup {
  FtrItem = 'ftrItem',
  OptItem = 'optItem',
  IdxItem = 'idxItem',
  OtcItem = 'otcItem',
}

export { TimeLevels, Products, Categories, ItemLists, ItemGroup }
