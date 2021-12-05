import { Stack, StackProps, DockerImageAssetLocation } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ep from 'aws-cdk-lib/aws-ecs-patterns';
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as ecr from 'aws-cdk-lib/aws-ecr'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets';
import {
  App, RemovalPolicy, Tags,
  aws_cognito as cognito,
  aws_ssm as ssm,
} from 'aws-cdk-lib'

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // const userPool = new cognito.UserPool(this, `test-user-pool`, {
    //   userPoolName: `test-user-pool`,
    //   selfSignUpEnabled: true,
    //   standardAttributes: {
    //     email: { required: true, mutable: true },
    //   },
    //   signInAliases: { email: true },
    //   accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
    //   removalPolicy: RemovalPolicy.DESTROY,
    // });
    // const domainPrefix = `test`
    // const userPoolDomain = new cognito.UserPoolDomain(this, "UserPoolDomain", {
    //   userPool: userPool,
    //   cognitoDomain: {
    //     domainPrefix: domainPrefix,
    //   },
    // });

    // const userPoolClient = userPool.addClient('client', {
    //   userPoolClientName: `test-client`,
    //   oAuth: {
    //     scopes: [ // クライアントがアクセス可能なユーザー属性情報
    //       cognito.OAuthScope.EMAIL,
    //       cognito.OAuthScope.OPENID,
    //       cognito.OAuthScope.PROFILE,
    //     ],
    //     callbackUrls: params.callbackUrls,
    //     logoutUrls: params.logoutUrls,
    //     flows: {
    //       // 認可コードグラント
    //       authorizationCodeGrant: true, // 移行予定
    //       implicitCodeGrant: true // 現在の実装 deprecation
    //     },
    //   },
    //   authFlows: {
    //     adminUserPassword: true,
    //     userPassword: true
    //   },
    //   generateSecret: true,
    // });

    // Create VPC
    const vpc = new ec2.Vpc(this, "sample-vpc", {
    });
    // Create ECS Cluster
    const cluster = new ecs.Cluster(this, "ecs-cluster", {
      vpc,
    });
    // Create ALB
    const loadBalancedFargateService = new ep.ApplicationLoadBalancedFargateService(
      this,
      "fargate-alb-service",
      {
        cluster,
        taskImageOptions: {
          image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
        },
        // platformVersion: ecs.FargatePlatformVersion.VERSION1_3,
      }
    );
  }
}
