const stripe = require('stripe')('sk_test_51NA10LCzT3rbKoNuLLhL7WEnEgnXzjWW7N7FVmvbL1e8o3TbEaguqwIwGIWRSSIMd1keDFnNX6dM5vZOKMZKcQeU00KlB7wYBw');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const {typeName, arguments} = event;

  if (typeName !== 'Mutation') {
    throw new Error('Not a mutation');
  }
  if (!arguments?.amount ) {
    throw new Error('Missing amount');
  }
        //Payment intent

    const paymentIntent = await stripe.paymentIntents.create({
        amount: arguments.amount,
        currency: 'usd'
      
        });
        
            return {
                    clientSecret: paymentIntent.client_secret
            };
};
