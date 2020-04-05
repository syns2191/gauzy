import { BaseEntityModel as IBaseEntityModel } from './base-entity.model';

export interface InvoiceItem extends IBaseEntityModel {
	itemNumber: number;
	name: string;
	description: string;
	unitCost: number;
	quantity: number;
	totalValue: number;
	invoiceId?: string;
	taskId?: string;
}
