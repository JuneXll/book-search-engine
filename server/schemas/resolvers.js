const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            console.log('User info', context.user);
            return await User.findById(context.user._id);
        }
    },

    Mutation: {
        loginUser: async (parent, { email, password })=>{
            if(!User){
                throw new AuthenticationError('No user found with this email')
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect Password');
            }

            return {token, user};
        },

        addUser: async (parent,{ username, email, password}, context)=>{
            const user= new User.create({username, email, password});
            const token = signToken(user);
            return {token, user};
        },

        saveBook: async (parent, {input}, context)=>{
            const updateUser = await User.findOneAndUpdate(
                {_id: context.user._id},
                {$addToSet: {savedBooks:input}},
                {new:true, runValidators: true}
            );
            return updatedUser;
        },

        removeBook: async (parent,{bookId}, context)=>{
            const updateUser = await User.findOneAndUpdate(
                {_id:context.user._id},
                {$pull:{savedBooks:{bookId:bookId}}},
                {new:true}
            );
            return updateUser;
        }
    }
};

module.exports = resolvers;