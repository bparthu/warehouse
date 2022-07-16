interface InventorySource {
  art_id: string,
  name: string,
  stock: string
}

interface Article {
  art_id: string
  amount_of: string
}

interface ProductSource {
  name: string
  contain_articles: Article[]

}

export interface InventorySeed {
  inventory: InventorySource[]
}

export interface ProductSeed {
  products: ProductSource[]
}
