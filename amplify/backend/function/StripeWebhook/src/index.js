

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    const body = JSON.parse(event.body);

     // Handle the event
  switch (body.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = body.data.object;
      console.log('PaymentIntent was successful!');
      break;
      case 'payment_intent.created':
      const paymentIntentCreated = body.data.object;
      console.log('PaymentIntent creado exitosamente!');
      break;
      case 'payment_intent.payment_failed':
      const paymentIntentPaymentFailed = event.data.object;
      console.log('PaymentIntent fallo!');
      break;
    case 'payment_method.attached':
      const paymentMethod = body.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${body.type}`);
  }
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify({received: true}),
    };
    return response;
};

// switch (event.type) {
//     case 'payment_intent.amount_capturable_updated':
//       const paymentIntentAmountCapturableUpdated = event.data.object;
//       // Then define and call a function to handle the event payment_intent.amount_capturable_updated
//       break;
//     case 'payment_intent.canceled':
//       const paymentIntentCanceled = event.data.object;
//       // Then define and call a function to handle the event payment_intent.canceled
//       break;
//     case 'payment_intent.created':
//       const paymentIntentCreated = event.data.object;
//       // Then define and call a function to handle the event payment_intent.created
//       break;
//     case 'payment_intent.partially_funded':
//       const paymentIntentPartiallyFunded = event.data.object;
//       // Then define and call a function to handle the event payment_intent.partially_funded
//       break;
//     case 'payment_intent.payment_failed':
//       const paymentIntentPaymentFailed = event.data.object;
//       // Then define and call a function to handle the event payment_intent.payment_failed
//       break;
//     case 'payment_intent.processing':
//       const paymentIntentProcessing = event.data.object;
//       // Then define and call a function to handle the event payment_intent.processing
//       break;
//     case 'payment_intent.requires_action':
//       const paymentIntentRequiresAction = event.data.object;
//       // Then define and call a function to handle the event payment_intent.requires_action
//       break;
//     case 'payment_intent.succeeded':
//       const paymentIntentSucceeded = event.data.object;
//       // Then define and call a function to handle the event payment_intent.succeeded
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }
