import * as apprunner_alpha from '@aws-cdk/aws-apprunner-alpha'
import * as cdk from 'aws-cdk-lib'
import * as ecrAssets from 'aws-cdk-lib/aws-ecr-assets'
import { Construct } from 'constructs'
import { aws_s3 as s3 } from 'aws-cdk-lib'

export class AwsAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    new s3.Bucket(this, 'MyFirstBucket', {
      versioned: true,
    })

    const imageAsset = new ecrAssets.DockerImageAsset(this, 'Image', {
      directory: './webapp',
    })

    const service = new apprunner_alpha.Service(this, 'NextJsService', {
      source: apprunner_alpha.Source.fromAsset({
        asset: imageAsset,
      }),
      cpu: apprunner_alpha.Cpu.ONE_VCPU,
      memory: apprunner_alpha.Memory.TWO_GB,
    })
    service.addEnvironmentVariable('RANDOM_IMAGE_API_URL', 'https://random.imagecdn.app/500/500')

    new cdk.CfnOutput(this, 'ServiceUrl', { value: service.serviceUrl })
  }
}
