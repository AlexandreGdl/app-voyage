export type CreateSlateDto =  {
  donorId?: string;
  recipientId: string;
  amount: number;
  title: string;
  voyageId: string;
  multipleDonorIds?: string[];
}