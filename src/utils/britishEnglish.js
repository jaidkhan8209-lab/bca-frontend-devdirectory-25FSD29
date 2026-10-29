const spelling = [
  [/\bcolorful\b/gi, 'colourful'], [/\bcolors\b/gi, 'colours'], [/\bcolor\b/gi, 'colour'],
  [/\borganize\b/gi, 'organise'], [/\borganizes\b/gi, 'organises'], [/\borganized\b/gi, 'organised'], [/\borganizing\b/gi, 'organising'],
  [/\borganization\b/gi, 'organisation'], [/\borganizations\b/gi, 'organisations'], [/\boptimize\b/gi, 'optimise'], [/\boptimized\b/gi, 'optimised'],
  [/\banalyze\b/gi, 'analyse'], [/\banalyzed\b/gi, 'analysed'], [/\bcenter\b/gi, 'centre'], [/\bcenters\b/gi, 'centres'],
  [/\bbehavior\b/gi, 'behaviour'], [/\bfavorite\b/gi, 'favourite'], [/\blicense\b/gi, 'licence'], [/\btraveling\b/gi, 'travelling'],
  [/\bpersonalize\b/gi, 'personalise'], [/\bcustomize\b/gi, 'customise'], [/\bpractice\b/gi, 'practise'],
]
export function toBritishEnglish(value = '') { return spelling.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), String(value)) }
