import {
  INodeType,
  INodeTypeDescription,
  IExecuteFunctions,
  INodeExecutionData,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import argon2 from 'argon2';

export class Argon2Encrypt implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Argon2 Encrypt',
    name: 'argon2Encrypt',
    icon: 'fa:lock',
    group: ['transform'],
    version: 1,
    description: 'Encrypt (hash) text using Argon2',
    defaults: {
      name: 'Argon2 Encrypt',
      color: '#00AAFF',
    },
    inputs: ['main'] as unknown as any,
    outputs: ['main'] as unknown as any,
    credentials: [],
    properties: [
      {
        displayName: 'Text',
        name: 'text',
        type: 'string',
        required: true,
        default: '',
        description: 'Text to encrypt (hash)',
      },
    ],
  };

  async execute(this: IExecuteFunctions) {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const text = this.getNodeParameter('text', i) as string;
      try {
        const hash = await argon2.hash(text, { type: argon2.argon2id });
        returnData.push({ json: { hash } });
      } catch (error) {
        throw new NodeOperationError(this.getNode(), error as Error, {
          itemIndex: i,
        });
      }
    }
    return [returnData];
  }
}
