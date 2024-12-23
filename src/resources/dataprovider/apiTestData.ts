import { USERS } from "../consts/consts.users";

export const userLogins = [
    { param: USERS.SUPER_ADMIN, expectedStatus: 200 },
  ];
  
export const testData2 = [
    { paramA: 'valueA1', paramB: 'valueB1', expectedStatus: 200 },
    { paramA: 'valueA2', paramB: 'valueB2', expectedStatus: 500 },
];