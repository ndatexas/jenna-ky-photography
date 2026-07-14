export type PhotoCategory = "film" | "family" | "personal" | "events"
export type PhotoAspect = "square" | "portrait" | "landscape" | "tall"

export interface GalleryPhoto {
  id: number
  category: PhotoCategory
  label: string
  aspect: PhotoAspect
  imageUrl?: string
}

export const galleryPhotos: GalleryPhoto[] = [
  { id: 1, category: "film", label: "Film Photography", aspect: "landscape", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/87cd687d44ec4ebda54339745174287a.jpg" },
  { id: 2, category: "film", label: "Film Photography", aspect: "landscape", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/92d397b61b2c4c7b9fefc7824f83fa6d.jpg" },
  { id: 3, category: "film", label: "Film Photography", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/f95638825bc741109d9c92e521f1834d.jpg" },
  { id: 4, category: "film", label: "Film Photography", aspect: "landscape", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/3c76637036b74879b58cef972cd35afe.jpg" },
  { id: 5, category: "film", label: "Film Photography", aspect: "landscape", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/44a4136ec7ae4e6e9957dfe5d78bb15f.jpg" },
  { id: 6, category: "film", label: "Film Photography", aspect: "landscape", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/17a747c1cbce4eb4a842d0f81bde7b96.jpg" },
  { id: 7, category: "film", label: "Film Photography", aspect: "landscape", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/dcff989ed2b4492381825392b7d298cf.jpg" },
  { id: 8, category: "family", label: "Family Session", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/e67d534e0da144a5b928106141137ac3.jpg" },
  { id: 9, category: "family", label: "Family Session", aspect: "landscape", imageUrl: "https://cdn.galaxy.ai/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/d2352899a7b04bb38535fdd965f8fa67.webp" },
  { id: 10, category: "family", label: "Family Session", aspect: "landscape", imageUrl: "https://cdn.galaxy.ai/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/91f8c2d3f9254b6f897654d63144e170.webp" },
  { id: 11, category: "family", label: "Family Session", aspect: "landscape", imageUrl: "https://cdn.galaxy.ai/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/0e41bbe21a534644ac7d1f9862668499.webp" },
  { id: 12, category: "family", label: "Family Session", aspect: "landscape", imageUrl: "https://cdn.galaxy.ai/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/74d65cda32e94e0587e6791aa2419596.webp" },
  { id: 13, category: "family", label: "Family Session", aspect: "landscape", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/b940ede22d9d4eb9bf960321d88469c7.jpg" },
  { id: 14, category: "family", label: "Family Session", aspect: "landscape", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/0a9e335b7dea4138a672e8c9c7810679.jpg" },
  { id: 15, category: "family", label: "Family Session", aspect: "tall", imageUrl: "https://cdn.galaxy.ai/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/fcd845bdd684415f90b19d5095c32f99.webp" },
  { id: 16, category: "personal", label: "Personal Portrait", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/897d2f1c280f41a4bd14c6d92e9a99da.jpg" },
  { id: 17, category: "personal", label: "Personal Portrait", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/ba520d4b3eae491289533001d36df05a.jpg" },
  { id: 18, category: "personal", label: "Personal Portrait", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/81ff2aaf883a4e6a9052460a56bbeed9.jpg" },
  { id: 19, category: "personal", label: "Personal Portrait", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/74a5d22cce4b4b7c90f3d8784511149b.jpg" },
  { id: 20, category: "events", label: "Event", aspect: "landscape", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/5600bf5d4ad14f3c9b8f922e4b5f41c5.jpg" },
  { id: 21, category: "events", label: "Event", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/99c4030851d246bba885e9789a01c800.jpg" },
  { id: 22, category: "events", label: "Event", aspect: "landscape", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/7932da61e12a46ef978ab47a6311b97f.jpg" },
  { id: 23, category: "events", label: "Event", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/136a3a5de9b04367ad2fb7964eec847c.jpg" },
  { id: 24, category: "events", label: "Event", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/b0cef4111d5641a6aaf4e3938bc70fe2.jpg" },
  { id: 25, category: "events", label: "Event", aspect: "landscape", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/224dced4c81c400fbead8137d4799106.jpg" },
  { id: 26, category: "events", label: "Event", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/8b7623a342ae4801869791cee739b95f.jpg" },
  { id: 27, category: "events", label: "Event", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/0891492557ff4a5095398c1c2ea76f9b.jpg" },
  { id: 28, category: "events", label: "Event", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/63408d63877e4016ae5daad8ff212609.jpg" },
  { id: 29, category: "events", label: "Event", aspect: "landscape", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/b7d9fe39d95e4260a6ec030533c23135.jpg" },
  { id: 30, category: "events", label: "Event", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/53188ff220d64511b5b2afe14a3c72c6.jpg" },
  { id: 31, category: "events", label: "Event", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/bb542d72af4342048925f44682d0baf1.jpg" },
  { id: 32, category: "events", label: "Event", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/82eb9ba9a38644188af89ac91d78923c.jpg" },
  { id: 33, category: "events", label: "Event", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/a6ebe0ddaf63476a93e4964079f62824.jpg" },
  { id: 34, category: "events", label: "Event", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/44bd8669ee274e479e41ea256c758dce.jpg" },
  { id: 35, category: "events", label: "Event", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/4406187f15f24136b0f44e54a0349adc.jpg" },
  { id: 36, category: "events", label: "Event", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/4cd55524190945ceb656264ef274f10f.jpg" },
  { id: 37, category: "events", label: "Event", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/846ef91eaac04df48c3ad38c5a2eadde.jpg" },
  { id: 38, category: "events", label: "Event", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/24d9e07a5bed4442b941f67b38335a47.jpg" },
  { id: 39, category: "events", label: "Event", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/bcc0047ecab1433d88e8a424e22b3ae6.jpg" },
  { id: 40, category: "events", label: "Event", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/05810259cdd14657bf379b9192967084.jpg" },
  { id: 41, category: "events", label: "Event", aspect: "landscape", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/2e2f76ff14854366932eb716158c07e5.jpg" },
  { id: 42, category: "events", label: "Event", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/b3f1970a6e4c4737a2cc32a2fdebe746.jpg" },
  { id: 43, category: "events", label: "Event", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/f91ed9d0276146f9a4b18b60838343bf.jpg" },
  { id: 44, category: "events", label: "Event", aspect: "tall", imageUrl: "https://galaxy-prod.tlcdn.com/view/user_2yN2f2AMpIolmtCtB2mqQ54a2u1/a9b49716d404428e966ba09e73976d08.jpg" },
]
