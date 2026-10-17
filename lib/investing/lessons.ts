export type Lesson = {
  id: string
  title: string
  description: string
  minutes: number
  paragraphs: string[]
  takeaways: string[]
  example: { title: string; body: string }
  question: { prompt: string; options: string[]; correctIndex: number; explanation: string }
  terms: { term: string; definition: string }[]
  sourceIds: string[]
}

export const guideSources = [
  { id: "fca-foundations", evidenceId: "FCA-INVEST-101-001", sourceRole: "UK public guidance", authority: "Financial Conduct Authority", title: "Should you invest?", href: "https://www.fca.org.uk/investsmart/should-you-invest" },
  { id: "fca-risk", evidenceId: "FCA-INVEST-101-002", sourceRole: "UK public guidance", authority: "Financial Conduct Authority", title: "Is it the right investment for you?", href: "https://www.fca.org.uk/investsmart/right-investment-you" },
  { id: "fca-funds", evidenceId: "FCA-INVEST-101-003", sourceRole: "UK public guidance", authority: "Financial Conduct Authority", title: "Advantages of mainstream investments", href: "https://www.fca.org.uk/investsmart/advantages-mainstream-investments" },
  { id: "moneyhelper", evidenceId: "MONEYHELPER-INVEST-101-001", sourceRole: "UK public guidance", authority: "MoneyHelper", title: "A beginner's guide to investing", href: "https://www.moneyhelper.org.uk/en/savings/investing/investing-beginners-guide" },
  { id: "sp-index", evidenceId: "SPDJI-INDEX-001", sourceRole: "Index provider", authority: "S&P Dow Jones Indices", title: "S&P 500", href: "https://www.spglobal.com/spdji/en/indices/equity/sp-500/" },
  { id: "msci-world", evidenceId: "MSCI-WORLD-001", sourceRole: "Index provider", authority: "MSCI", title: "Developed markets indexes", href: "https://www.msci.com/indexes/group/developed-markets-indexes" },
  { id: "msci-acwi", evidenceId: "MSCI-ACWI-001", sourceRole: "Index provider", authority: "MSCI", title: "MSCI ACWI Index", href: "https://www.msci.com/indexes/index/892400" },
  { id: "ftse-uk", evidenceId: "FTSE-INDEX-001", sourceRole: "Index provider", authority: "FTSE Russell", title: "FTSE UK Index Series", href: "https://www.lseg.com/en/ftse-russell/indices/uk" },
  { id: "stoxx-europe", evidenceId: "STOXX-INDEX-001", sourceRole: "Index provider", authority: "STOXX", title: "STOXX Europe 600", href: "https://stoxx.com/index/sxxp/" },
  { id: "lse-etf", evidenceId: "LSE-ETF-001", sourceRole: "UK exchange education", authority: "London Stock Exchange", title: "What are ETFs?", href: "https://www.londonstockexchange.com/personal-investing/what-are-etfs-lse" },
  { id: "sec-etf", evidenceId: "SEC-ETF-001", sourceRole: "US regulator · structure only", authority: "U.S. Securities and Exchange Commission", title: "Investor Bulletin: Exchange-Traded Funds (ETFs)", href: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-24" },
  { id: "eu-area", evidenceId: "EU-GEOGRAPHY-001", sourceRole: "EU institution", authority: "European Union", title: "Countries using the euro", href: "https://european-union.europa.eu/institutions-law-budget/euro/countries-using-euro_en" },
  { id: "msci-asia", evidenceId: "MSCI-ASIA-001", sourceRole: "Index provider", authority: "MSCI", title: "MSCI AC Asia Pacific ex Japan Index", href: "https://www.msci.com/indexes/index/899903" },
  { id: "govuk-isa", evidenceId: "GOVUK-ISA-101-001", sourceRole: "UK public guidance", authority: "GOV.UK", title: "Individual Savings Accounts (ISAs)", href: "https://www.gov.uk/individual-savings-accounts" },
  { id: "govuk-pension", evidenceId: "GOVUK-PENSION-101-001", sourceRole: "UK public guidance", authority: "GOV.UK", title: "Workplace pensions", href: "https://www.gov.uk/workplace-pensions" },
]

// Teaching interactions follow ontology v3 and evidence registry v2.
// These checks never change Money Decision's policy or decide personal readiness.
export const lessons: Lesson[] = [
  {
    id: "basics", title: "What is investing?", description: "Begin with the idea, not a product.", minutes: 2,
    paragraphs: [
      "Investing means putting money into assets with the aim of receiving a return over time. An asset is something you own, such as a share in a company. Its value can rise or fall.",
      "Saving cash in a bank or building society account is different from investing. There is no risk-free investment: you could get back less than you put in. This guide explains concepts; it does not decide whether investing is suitable for you.",
    ],
    takeaways: ["A return is what an investment gains or loses over time.", "Investment values can fall as well as rise.", "Learning about investing is different from choosing an investment."],
    example: { title: "Imagine two different pots", body: "One pot holds accessible cash savings. Another holds shares whose prices change. They serve different purposes; neither description tells you where your own money should go." },
    question: { prompt: "Which statement about investing is true?", options: ["Investments always grow if you wait.", "You could get back less than you put in.", "Learning the basics means investing is suitable for you."], correctIndex: 1, explanation: "Investments can lose value. Time and knowledge do not guarantee a return or establish personal suitability." },
    terms: [{ term: "Asset", definition: "Something you own. In this guide, examples include shares and bonds." }, { term: "Return", definition: "What an investment gains or loses over time, including changes in value and any income." }],
    sourceIds: ["fca-foundations", "moneyhelper"],
  },
  {
    id: "foundations-and-time", title: "Foundations and time", description: "Understand what comes before investing.", minutes: 3,
    paragraphs: [
      "Official UK guidance puts immediate finances first: review short-term or costly debt, keep accessible emergency savings and consider your workplace pension if you are employed. The FCA warns against using credit to invest.",
      "Money needed soon is different from long-term money. MoneyHelper discusses investing for goals more than five years away. The FCA notes that for a fairly short timeframe, perhaps up to three years, savings may be more appropriate to explore. These are educational guideposts, not a personal suitability test.",
    ],
    takeaways: ["Emergency savings need to be accessible.", "Money needed soon can be exposed to a fall in investment value.", "A longer time horizon does not remove the risk of loss."],
    example: { title: "A repair bill versus a distant goal", body: "An unexpected repair needs money when the bill arrives. Money held in investments might be worth less at that moment. A distant goal gives a different timeframe, but still no guarantee." },
    question: { prompt: "Why does the time horizon matter?", options: ["A short deadline guarantees a better return.", "Investing is risk-free after five years.", "You might need the money when its investment value has fallen."], correctIndex: 2, explanation: "A deadline can force you to use money during a fall. Neither a short nor a long timeframe guarantees investment growth." },
    terms: [{ term: "Time horizon", definition: "The time until you expect to need the money." }, { term: "Emergency savings", definition: "Accessible cash kept for unexpected costs. This guide does not set a personal target amount." }],
    sourceIds: ["fca-foundations", "fca-risk", "moneyhelper"],
  },
  {
    id: "asset-types", title: "Shares, bonds and cash", description: "Get to know the different building blocks.", minutes: 2,
    paragraphs: [
      "A share is a stake in a company. Its value can rise or fall with the company and the market's view of it. A bond is an IOU: you lend money to a company or government and may receive interest. Bonds can also change in value.",
      "MoneyHelper lists cash alongside these types, but money in a bank or building society account is saving, not investing. Naming the building blocks does not tell you which to choose or how much of each to hold.",
    ],
    takeaways: ["Shares represent ownership in a company.", "Bonds represent lending, and can still change in value.", "Cash savings and investments are different."],
    example: { title: "Own a part or lend money?", body: "A share makes its holder a part-owner. A bond makes its holder a lender. Both have risks; one is not simply another name for the other." },
    question: { prompt: "What is a bond?", options: ["An IOU for lending to a company or government.", "A guarantee that you cannot lose money.", "A stake in the ownership of a company."], correctIndex: 0, explanation: "A bond represents lending. It may pay interest, but its value can change and it is not risk-free." },
    terms: [{ term: "Share", definition: "A stake in a company. It can change in value." }, { term: "Bond", definition: "An IOU issued by a company or government that borrows money." }],
    sourceIds: ["moneyhelper"],
  },
  {
    id: "funds", title: "Pooled funds and tracker funds", description: "See how a basket of investments works.", minutes: 3,
    paragraphs: [
      "A pooled fund brings investors' money together, typically into a basket of shares or bonds. That can spread exposure across holdings, rather than relying on a small number of companies. A fund can still lose value.",
      "Active funds aim to beat a market index; outperformance is not guaranteed and they can do worse. Tracker funds take a passive approach and aim to match an index. Their management charges are typically lower, which is a cost difference, not a reason to recommend a particular fund.",
      "The FCA uses the UK FTSE 100 as an example of a market index of large listed companies. This illustrates what an index is; it is not a recommendation of a FTSE fund.",
    ],
    takeaways: ["A pooled fund is a basket, not a guarantee.", "Active aims to beat an index; tracker aims to match it.", "No particular fund or provider is recommended here."],
    example: { title: "A basket still moves", body: "A basket with many holdings relies less on a single holding. If several holdings or a whole market fall together, the basket can still fall too." },
    question: { prompt: "What does a tracker fund aim to do?", options: ["Beat every other investment.", "Remove the risk of losing money.", "Match a market index."], correctIndex: 2, explanation: "A tracker aims to follow an index. That index can fall, so matching it does not promise a positive return." },
    terms: [{ term: "Pooled fund", definition: "A vehicle that combines investors' money into a basket of holdings." }, { term: "Market index", definition: "A measure that follows a group of investments. It can be used as a reference for a fund." }],
    sourceIds: ["fca-funds", "moneyhelper"],
  },
  {
    id: "markets", title: "Meet the main markets", description: "Explore regions without turning a map into a recommendation.", minutes: 4,
    paragraphs: [
      "A share market brings together shares in listed companies. A regional label describes coverage, not the whole economy. The S&P 500 follows large US companies. The FTSE 100 follows large companies listed on the London Stock Exchange; it does not represent every UK business or the whole UK economy. Companies in either group can earn revenue abroad.",
      "Europe, the European Union (EU) and the eurozone are different groupings. Europe is a geographic region, the EU is a political and economic union, and the eurozone consists of EU countries using the euro. A European index can include countries outside the EU, such as the UK and Switzerland. Asia also contains many distinct markets, including Japan, China and India. A regional index follows its own rules and may cover only some of them. These names explain coverage, not which market to choose.",
    ],
    takeaways: ["A regional share index does not measure an entire economy.", "Europe, the EU and the eurozone are different groupings.", "Asia contains distinct markets; an index may include only some of them."],
    example: { title: "Read the map behind the label", body: "A hypothetical European share fund includes UK and Swiss companies. That is compatible with a Europe label, even though those countries are outside the EU. This illustrates coverage; it is not a recommended investment." },
    question: { prompt: "Which statement correctly describes market coverage?", options: ["Europe, the EU and the eurozone always mean the same countries.", "The FTSE 100 represents the whole UK economy.", "A European index can include countries outside the EU."], correctIndex: 2, explanation: "Europe is broader than the EU or eurozone. Each index defines its own coverage. Recognising that distinction does not establish personal investment readiness." },
    terms: [{ term: "Share market", definition: "A market in which shares in listed companies are bought and sold." }, { term: "Eurozone", definition: "The group of EU countries that use the euro as their currency." }, { term: "Regional exposure", definition: "The connection of holdings to a geographic region, as defined by the investment or index. Companies may also do business elsewhere." }],
    sourceIds: ["sp-index", "ftse-uk", "stoxx-europe", "eu-area", "msci-asia"],
  },
  {
    id: "indices", title: "World indices and the S&P 500", description: "Learn what a benchmark includes and leaves out.", minutes: 4,
    paragraphs: [
      "An index measures a defined group of investments and can serve as a benchmark: a reference for comparing performance. It is not a fund you own. A fund may aim to track an index, but its costs and how it operates can make its results differ. The S&P 500 measures large US companies, so it is not a global share index even though those companies may sell worldwide.",
      "A world label needs a specific index name. MSCI World covers developed markets, including the US. MSCI ACWI covers developed and emerging markets, but still does not include every stock. Other world indices can have different coverage. If a world-tracking fund already holds US companies, adding a US-tracking fund can increase exposure to the same companies. Understanding overlap helps explain holdings; it does not tell you which funds to buy or combine.",
    ],
    takeaways: ["An index is a benchmark, while a fund holds investments.", "MSCI World includes the US; MSCI ACWI also includes emerging markets.", "Two funds with different labels can hold the same companies."],
    example: { title: "Two labels, overlapping holdings", body: "Imagine a world-tracking fund and a US-tracking fund both holding the same US company. The two funds share exposure to that company rather than introducing a different company. This is an illustration of overlap, not a portfolio suggestion." },
    question: { prompt: "What can happen when a world-tracking fund is combined with an S&P 500-tracking fund?", options: ["The funds can overlap in US companies, increasing US exposure.", "The world fund automatically excludes every US company.", "Different names guarantee completely different holdings."], correctIndex: 0, explanation: "World indices can include US companies, so the funds can overlap. Checking this concept does not decide which combination is suitable or whether someone is ready to invest." },
    terms: [{ term: "Benchmark", definition: "A reference measure used to compare performance, such as an index." }, { term: "Holdings", definition: "The individual investments owned by a fund or investor." }, { term: "Overlap", definition: "When two or more funds hold some of the same investments." }],
    sourceIds: ["sp-index", "msci-world", "msci-acwi"],
  },
  {
    id: "etfs", title: "How ETFs work", description: "Separate the fund structure from what it holds.", minutes: 3,
    paragraphs: [
      "An exchange-traded fund (ETF) is a fund whose shares trade on a stock exchange. Some ETFs aim to track a benchmark, such as a share index. Others are actively managed. ETF describes how the fund is structured and traded; it does not tell you exactly what it owns or promise a particular result.",
      "Some ETFs hold a wide range of investments, while others focus on a narrow market or sector. Being an ETF does not automatically make a fund broadly diversified or low risk. Investment values can fall, and fund charges and trading costs reduce the return kept. An ETF's trading price can also differ from the value of its underlying holdings. These features explain the structure, without recommending a fund, provider or market.",
    ],
    takeaways: ["ETF shares are bought and sold on an exchange.", "An ETF can track a benchmark or be actively managed.", "The ETF label does not guarantee diversification, low costs or a profit."],
    example: { title: "Same structure, different contents", body: "Imagine one ETF holding companies across several countries and another holding companies from a single sector. Both trade on an exchange, but their concentration differs. Neither imaginary fund is a recommendation." },
    question: { prompt: "What does the ETF label tell you?", options: ["The fund must hold shares from every country.", "The fund's shares trade on an exchange; its holdings and risks still vary.", "The fund cannot lose value because it tracks an index."], correctIndex: 1, explanation: "ETF describes a fund structure, not a guarantee about its contents or performance. A correct answer shows understanding of this term, not personal investment readiness." },
    terms: [{ term: "ETF", definition: "An exchange-traded fund: a fund whose shares are traded on a stock exchange." }, { term: "Concentration", definition: "Reliance on a limited set of holdings, markets or sectors." }, { term: "Underlying holdings", definition: "The investments a fund owns, distinct from the fund shares that investors trade." }],
    sourceIds: ["lse-etf", "sec-etf"],
  },
  {
    id: "risk-diversification-costs", title: "Risk, diversification and costs", description: "Three ideas to keep together.", minutes: 3,
    paragraphs: [
      "Risk includes the possibility that investment values fall. Diversification means spreading exposure across different assets and markets, reducing reliance on any single investment. It cannot remove investment risk.",
      "Investment and service-provider fees reduce the returns you keep. Understanding both upfront and ongoing costs is part of comparing options. Lower fees alone do not make an investment suitable or guarantee a better result.",
    ],
    takeaways: ["Spreading exposure reduces reliance on one holding.", "Different investments can fall at the same time.", "Fees matter whether values rise or fall."],
    example: { title: "Less reliance, not no risk", body: "Owning several companies makes one company's result less dominant than owning just that company. Wider market falls can still affect several holdings together." },
    question: { prompt: "What can diversification do?", options: ["Guarantee that the total value will rise.", "Reduce reliance on one investment, without removing risk.", "Make fees disappear."], correctIndex: 1, explanation: "Diversification spreads exposure, but losses can still happen. Costs remain a separate consideration." },
    terms: [{ term: "Diversification", definition: "Spreading exposure across assets and markets instead of relying on one holding." }, { term: "Fee", definition: "A charge for an investment or service, paid upfront or over time." }],
    sourceIds: ["fca-foundations", "fca-funds", "moneyhelper"],
  },
  {
    id: "accounts-and-warning-signs", title: "UK accounts and warning signs", description: "Separate the wrapper from what is inside.", minutes: 3,
    paragraphs: [
      "An Individual Savings Account (ISA) can hold cash or eligible investments and provides tax advantages. A Stocks and Shares ISA is a tax wrapper, not a guarantee that its investments will make money.",
      "Workplace pensions commonly receive employer contributions and invest money for retirement. Scheme rules differ: check your own arrangements rather than relying on a generic contribution example.",
      "Be cautious of promotions that promise very high or guaranteed returns or present investing as a quick way to get rich. Official guidance recommends understanding the risks before committing money.",
    ],
    takeaways: ["A wrapper affects tax treatment, not the risk of what is inside.", "Workplace pension details depend on your scheme.", "Completing a guide is not a recommendation to invest."],
    example: { title: "The container and the contents", body: "Think of an ISA as a container with tax rules. If investments inside the container fall in value, the container does not prevent that loss." },
    question: { prompt: "Does a Stocks and Shares ISA remove investment risk?", options: ["No. Investments held inside it can still lose value.", "Yes. A tax advantage guarantees a profit.", "Yes, as long as the promotion promises a return."], correctIndex: 0, explanation: "The wrapper changes tax treatment, not investment risk. Promises in promotions do not create a guarantee." },
    terms: [{ term: "Tax wrapper", definition: "An account structure with tax rules, such as an ISA. It does not remove the risks of investments inside it." }, { term: "Workplace pension", definition: "A way of saving and investing for retirement through work, commonly with employer contributions. Your scheme's rules apply." }],
    sourceIds: ["govuk-isa", "govuk-pension", "fca-risk"],
  },
]
