export interface ConversationService {
  appendMessage(): Promise<void>
}

export const conversationService: ConversationService = {
  async appendMessage() {
    return
  }
}
