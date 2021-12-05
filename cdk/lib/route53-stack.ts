import { Stack, App, StackProps } from 'aws-cdk-lib'
import { PublicHostedZone } from 'aws-cdk-lib/aws-route53'
import { Certificate, ValidationMethod } from 'aws-cdk-lib/aws-certificatemanager'

export class Route53Stack extends Stack {
  /**
   * Step 1
   * cdk deploy Route53Stack
   * 
   * Step 2
   * Route53Stack: creating CloudFormation changeset...
   * [█████████████████████████████·····························] (2/4)
   * 10:36:21 | CREATE_IN_PROGRESS   | AWS::CloudFormation::Stack           | Route53Stack
   * 10:37:48 | CREATE_IN_PROGRESS   | AWS::CertificateManager::Certificate | certificate
   * 
   * Step 3
   * AWS consol > Route 53 > hostedzone > example.com > create record
   * record name [sub-domain]
   * record type [NS]
   * values [sub-domain NS values:copyPasta]
   * 
   * @param scope 
   * @param id 
   * @param props 
   */
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const domainName = process.env.ROUTE53_DOMAIN || ''
    const hostedZone = new PublicHostedZone(this, 'hostedzone', {
      zoneName: domainName
    });

    const certificate = new Certificate(this, 'certificate', {
      domainName: domainName,
      validation: {
        method: ValidationMethod.DNS,
        props: { hostedZone: hostedZone }
      }
    })
  }
}