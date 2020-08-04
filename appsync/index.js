'use strict';

import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';
import AWSAppSyncClient from 'aws-appsync';
import gql from 'graphql-tag';

const appsync = {
    AWSAppSyncClient: AWSAppSyncClient,
    AUTH_TYPE: AUTH_TYPE,
    gql: gql
};

if (typeof window !== 'undefined') {
    window.appsync = appsync;
}

export default appsync;