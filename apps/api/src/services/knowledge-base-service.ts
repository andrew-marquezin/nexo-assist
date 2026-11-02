export interface KnowledgeBaseService {
  searchArticles(): Promise<void>
}

export const knowledgeBaseService: KnowledgeBaseService = {
  async searchArticles() {
    return
  }
}
