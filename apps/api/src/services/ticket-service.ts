export interface TicketService {
  createTicket(): Promise<void>
}

export const ticketService: TicketService = {
  async createTicket() {
    return
  }
}
