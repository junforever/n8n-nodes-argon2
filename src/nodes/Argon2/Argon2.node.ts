import { INodeType, INodeTypeDescription, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import argon2 from 'argon2';

export class Argon2 implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Argon2',
		name: 'argon2',
		icon: 'fa:lock',
		group: ['transform'],
		version: 1,
		description: 'Encrypt or verify text using Argon2',
		defaults: {
			name: 'Argon2',
			color: '#00aaff',
		},
		// Forzar tipado para máxima compatibilidad con futuras versiones de n8n
		inputs: ['main'] as unknown as any,
		outputs: ['main'] as unknown as any,
		credentials: [],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [
					{ name: 'Encrypt', value: 'encrypt', description: 'Encrypt a string' },
					{ name: 'Verify', value: 'verify', description: 'Verify a string against a hash' },
				],
				default: 'encrypt',
				description: 'Choose the operation to perform.'
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				required: true,
				default: '',
				description: 'Text to encrypt or verify',
				displayOptions: {
					show: {
						operation: ['encrypt', 'verify']
					}
				}
			},
			{
				displayName: 'Hash',
				name: 'hash',
				type: 'string',
				required: true,
				default: '',
				description: 'Hash to verify against',
				displayOptions: {
					show: {
						operation: ['verify']
					}
				}
			}
		],
	};

	async execute(this: IExecuteFunctions) {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const operation = this.getNodeParameter('operation', i) as string;
			const text = this.getNodeParameter('text', i) as string;

			if (operation === 'encrypt') {
				try {
					const hash = await argon2.hash(text, { type: argon2.argon2id });
					returnData.push({ json: { hash } });
				} catch (error) {
					throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
				}
			} else if (operation === 'verify') {
				const hash = this.getNodeParameter('hash', i) as string;
				try {
					const match = await argon2.verify(hash, text);
					returnData.push({ json: { match } });
				} catch (error) {
					throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
				}
			} else {
				throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`, { itemIndex: i });
			}
		}

		return this.prepareOutputData(returnData);
	}
}
