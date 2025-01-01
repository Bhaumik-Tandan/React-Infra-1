import { InfraStack } from '../lib/infra-stack';
import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { jest } from '@jest/globals';

// Mock the required classes and methods
jest.mock('aws-cdk-lib/aws-s3-deployment', () => ({
  BucketDeployment: jest.fn().mockImplementation(() => {}),  // Mock the constructor for BucketDeployment
  Source: {
    asset: jest.fn(() => 'mock-asset-path'),
  },
}));

test('S3 Bucket is created with correct website configuration and public access settings', () => {
  const app = new App();
  const stack = new InfraStack(app, 'InfraStack');
  const template = Template.fromStack(stack);

  // Check that the S3 bucket is configured correctly
  template.hasResourceProperties('AWS::S3::Bucket', {
    WebsiteConfiguration: {
      IndexDocument: 'index.html',  // Ensure index.html is set as the entry point
      ErrorDocument: 'index.html',  // Ensure error handling redirects to index.html for client-side routing
    },
    AccessControl: 'BucketOwnerFullControl', // Ensure full control for the bucket owner
    PublicAccessBlockConfiguration: {
      BlockPublicAcls: true,  // Ensure public ACLs are blocked for security
      IgnorePublicAcls: true,  // Ensure ignoring of public ACLs for added security
    },
  });
});