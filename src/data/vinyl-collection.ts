export interface VinylRecord {
  id: string;
  title: string;
  artist: string;
  year: string;
  cover: string;
  previewUrl: string;
}

/** Default resting record: Still Loving You */
export const DEFAULT_VINYL_ID = "still-loving-you";

export const vinylCollection: VinylRecord[] = [
  {
    id: "still-loving-you",
    title: "Still Loving You",
    artist: "Scorpions",
    year: "1984",
    cover: "/vinyl/covers/still-loving-you.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a1/84/bd/a184bd2b-fe7f-40bc-8b61-911034b44dca/mzaf_17778569598453434009.plus.aac.p.m4a",
  },
  {
    id: "peace-of-mind",
    title: "Peace of Mind",
    artist: "Boston",
    year: "1976",
    cover: "/vinyl/covers/peace-of-mind.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/95/17/41/951741b0-8f86-0e43-f832-2e7bd05b9ec9/mzaf_1072555438857215849.plus.aac.p.m4a",
  },
  {
    id: "wind-of-change",
    title: "Wind of Change",
    artist: "Scorpions",
    year: "1990",
    cover: "/vinyl/covers/wind-of-change.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/fe/ee/d4/feeed4a7-ac1a-6f05-30e0-fa94f928d399/mzaf_17504970637263282210.plus.aac.p.m4a",
  },
  {
    id: "any-way-you-want-it",
    title: "Any Way You Want It",
    artist: "Journey",
    year: "1980",
    cover: "/vinyl/covers/any-way-you-want-it.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a8/a4/c7/a8a4c79c-3eef-3283-f3cb-8c1eb190e8ca/mzaf_4300899229943028580.plus.aac.p.m4a",
  },
  {
    id: "come-as-you-are",
    title: "Come As You Are",
    artist: "Nirvana",
    year: "1991",
    cover: "/vinyl/covers/come-as-you-are.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/f4/3e/86/f43e8664-bdd9-bc56-8d2b-76064c865920/mzaf_15456055651529260945.plus.aac.p.m4a",
  },
  {
    id: "kryptonite",
    title: "Kryptonite",
    artist: "3 Doors Down",
    year: "2000",
    cover: "/vinyl/covers/kryptonite.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/4c/12/d7/4c12d750-14f9-6ebd-a4da-a79bc8b83e41/mzaf_17986687241844066254.plus.aac.p.m4a",
  },
  {
    id: "drops-of-jupiter",
    title: "Drops of Jupiter (Tell Me)",
    artist: "Train",
    year: "2001",
    cover: "/vinyl/covers/drops-of-jupiter.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/68/be/5b/68be5b8f-a607-75ea-3305-bde00ffd1b68/mzaf_13504218969728881771.plus.aac.p.m4a",
  },
  {
    id: "everlong",
    title: "Everlong",
    artist: "Foo Fighters",
    year: "1997",
    cover: "/vinyl/covers/everlong.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d0/77/17/d07717cb-9977-1cbb-6634-3e598d0c4da6/mzaf_15769952961470333318.plus.aac.p.m4a",
  },
  {
    id: "sextape",
    title: "Sextape",
    artist: "Deftones",
    year: "2010",
    cover: "/vinyl/covers/sextape.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/20/1d/f3/201df392-eb3c-d8b3-6e0f-59a7b54f3f72/mzaf_11753280202635510655.plus.aac.p.m4a",
  },
  {
    id: "runaway",
    title: "Runaway",
    artist: "Bon Jovi",
    year: "1984",
    cover: "/vinyl/covers/runaway.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/16/96/d3/1696d3bc-84e8-4ee2-bd40-fe6f5507400a/mzaf_18233498331080095001.plus.aac.p.m4a",
  },
  {
    id: "everlasting-bass",
    title: "Everlasting Bass",
    artist: "Rodney O & Joe Cooley",
    year: "1988",
    cover: "/vinyl/covers/everlasting-bass.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/81/9d/f4/819df4f4-29b8-ab33-2183-a558118f8591/mzaf_12634477782122705142.plus.aac.p.m4a",
  },
  {
    id: "big-poppa",
    title: "Big Poppa",
    artist: "The Notorious B.I.G.",
    year: "1994",
    cover: "/vinyl/covers/big-poppa.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/7d/25/cc/7d25cce3-9570-6098-9c73-1bb9ae5ebd13/mzaf_6643648478646883154.plus.aac.p.m4a",
  },
  {
    id: "jaadu-teri-naazar",
    title: "Jaadu Teri Nazar",
    artist: "Udit Narayan",
    year: "1990",
    cover: "/vinyl/covers/jaadu-teri-naazar.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/6d/65/0a/6d650af2-26b3-5bfc-aaaf-9c2fa5081e5a/mzaf_15414500561815597077.plus.aac.p.m4a",
  },
  {
    id: "chand-se-parda",
    title: "Chand Se Parda",
    artist: "Kumar Sanu",
    year: "1994",
    cover: "/vinyl/covers/chand-se-parda.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/0e/a9/5d/0ea95d36-3aed-5baa-1746-da050d754d88/mzaf_3088414733546086384.plus.aac.p.m4a",
  },
  {
    id: "eventually",
    title: "Eventually",
    artist: "Tame Impala",
    year: "2015",
    cover: "/vinyl/covers/eventually.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/09/93/7d/09937dd0-967b-b304-a485-053dfaf7d0c6/mzaf_16227325571594810181.plus.aac.p.m4a",
  },
  {
    id: "pyar-manga-hai",
    title: "Pyar Manga Hai Tumhi Se (The Unwind Mix)",
    artist: "Sreerama Chandra",
    year: "2016",
    cover: "/vinyl/covers/pyar-manga-hai.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/d6/b0/8d/d6b08df6-4adb-3f0e-c4c5-3d79a1ee75a5/mzaf_12984619018159243127.plus.aac.p.m4a",
  },
  {
    id: "all-eyez-on-me",
    title: "All Eyez On Me (feat. Big Syke)",
    artist: "2Pac",
    year: "1996",
    cover: "/vinyl/covers/all-eyez-on-me.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/bc/ce/31/bcce3175-61d8-99da-03ec-2646308b05b8/mzaf_16629756380024085628.plus.aac.p.m4a",
  },
  {
    id: "hothon-se-chu-lo",
    title: "Hothon Se Chhu Lo Tum",
    artist: "Jagjit Singh",
    year: "1981",
    cover: "/vinyl/covers/hothon-se-chu-lo.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e6/23/de/e623dec7-4255-8fe6-ed21-e81749ad3265/mzaf_8577462678746429439.plus.aac.p.m4a",
  },
  {
    id: "deep-in-your-soul",
    title: "DEEP IN YOUR SOUL",
    artist: "alan vuong",
    year: "2025",
    cover: "/vinyl/covers/deep-in-your-soul.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c4/45/1a/c4451a4f-df73-69a1-ebc9-88cb1d394c72/mzaf_16996304012688164084.plus.aac.p.m4a",
  },
  {
    id: "otherside",
    title: "Otherside",
    artist: "Red Hot Chili Peppers",
    year: "1999",
    cover: "/vinyl/covers/otherside.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/9a/45/f8/9a45f881-0fc0-a732-71ff-9b119ed459ef/mzaf_16792293069829482436.plus.aac.p.m4a",
  },
  {
    id: "me-olvide-de-vivir",
    title: "Me Olvid\u00e9 de Vivir",
    artist: "Julio Iglesias",
    year: "1978",
    cover: "/vinyl/covers/me-olvide-de-vivir.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/23/e0/1d/23e01d7a-c011-2422-534b-b16a235acf01/mzaf_9697301734506772556.plus.aac.p.m4a",
  },
  {
    id: "go-your-own-way",
    title: "Go Your Own Way",
    artist: "Fleetwood Mac",
    year: "1976",
    cover: "/vinyl/covers/go-your-own-way.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d1/37/68/d1376853-ec1e-cce0-4ac9-2e98fc9d9c51/mzaf_7672022765745493173.plus.aac.p.m4a",
  },
  {
    id: "sultans-of-swing",
    title: "Sultans of Swing",
    artist: "Dire Straits",
    year: "1978",
    cover: "/vinyl/covers/sultans-of-swing.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/34/32/bd/3432bdb8-1f76-d95f-401b-e93e32cd76c8/mzaf_4481796812840018496.plus.aac.p.m4a",
  },
  {
    id: "heaven",
    title: "Heaven",
    artist: "Bryan Adams",
    year: "1985",
    cover: "/vinyl/covers/heaven.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f8/c5/6b/f8c56ba6-b52a-4cce-3234-f225da838e7d/mzaf_3847569261753735800.plus.aac.p.m4a",
  },
];

export function getVinylIndex(id: string) {
  return vinylCollection.findIndex((v) => v.id === id);
}