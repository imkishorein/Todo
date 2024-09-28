// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
//
// export default NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: '558985239679-t4qtlue8i7c9ht59e0kpmfhvhv9ohnh5.apps.googleusercontent.com',
//             clientSecret: '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',
//             authorization: {
//                 params: {
//                     prompt: "select_account",  // Forces Google to always show the account selection
//                 },
//             },
//         }),
//     ],
// });
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: '558985239679-vetljc3n1berjolmgj228fupvgbke4fv.apps.googleusercontent.com',
            clientSecret: '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',
            authorization: {
                params: {
                    prompt: "select_account",
                },
            },
        }),
    ],
});
