import { INodeType, INodeTypeDescription, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import argon2 from 'argon2';

export class Argon2Verify implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Argon2 Verify',
		name: 'argon2Verify',
		icon: 'fa:lock',
		group: ['transform'],
		version: 1,
		description: 'Verify text against Argon2 hash',
		defaults: {
			name: 'Argon2 Verify',
			color: '#00aaff',
		},
		inputs: ['main'] as unknown as any,
		outputs: ['true', 'false'] as unknown as any,
		outputNames: ['true', 'false'],
		credentials: [],
		properties: [
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				required: true,
				default: '',
				description: 'Text to verify'
			},
			{
				displayName: 'Hash',
				name: 'hash',
				type: 'string',
				required: true,
				default: '',
				description: 'Hash to verify against'
			}
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const outputData: INodeExecutionData[][] = [[], []]; // true, false

		for (let i = 0; i < items.length; i++) {
			const text = this.getNodeParameter('text', i) as string;
			const hash = this.getNodeParameter('hash', i) as string;
			try {
				const match = await argon2.verify(hash, text);
				if (match) {
					outputData[0].push({ json: { match: true } });
				} else {
					outputData[1].push({ json: { match: false } });
				}
			} catch (error) {
				let errorMessage = 'Unknown error';
				if (error instanceof Error) {
					errorMessage = error.message;
				}
				outputData[1].push({ json: { match: false, error: errorMessage } });
			}
		}
		return outputData;
	}
}
