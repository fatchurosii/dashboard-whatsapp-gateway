import MasterUser from "@src/views/master/user/Index.vue"
let routes = [
    {
        path: '/master',
        children:[
            {
              path: 'user',
              name: 'master-user',
              component: MasterUser
            },
        ]

    }    
]

export default routes