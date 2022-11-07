const sqs = require('@greenlight/sqs');
const { protoBuilders: cardProtoBuilders } = require('@greenlight/card-grpc-client');
const { EventType } = require('@greenlight/protos/gl/events/v1beta1/event_message_common_pb');
const sns = require('@greenlight/sns');
sns.setConfig();
const EventTypeNames = {};
Object.keys(EventType).forEach((key) => {
    EventTypeNames[EventType[key]] = key;
});


if(require.main === module){
    // const eventMessage = cardProtoBuilders.buildUpdateCardRequestEvent({
    //     cardId: 1923200,
    //     cardType: 'custom',
    //     cardOrderState: 'canceled',
    // });
    const eventMessage = cardProtoBuilders.buildCreateCardRequestEvent({
        cardId: 1923200,
        cardType: 'custom',
        cardOrderState: 'canceled',
    });
    console.log(JSON.stringify(JSON.stringify(sns.encodeMessageToPayload(eventMessage))));
}

// ctl localstack sqs send-message --queue-url http://localstack:30066/000000000000/local-account-management.fifo --message-body "{\"Message\":\"\\\"CiQ0M2NkMWE5MS01YjJiLTQxYjYtODFkNi0zYjk0ZTYyYmY4NDYSDAim0YqbBhDAi//8AhgzOogBCiQ0M2NkMWE5MS01YjJiLTQxYjYtODFkNi0zYjk0ZTYyYmY4NDYaDAim0YqbBhCA/sf7AiAzKlAKJDYyMTU2YTllLTEwNjYtNGFkYi1iY2ZlLTUxM2IwZWMwNzA3ZRIkNDNjZDFhOTEtNWIyYi00MWI2LTgxZDYtM2I5NGU2MmJmODQ2IgBCANIBBhoECICxdQ==\\\"\",\"MessageAttributes\":{\"contentType\":{\"DataType\":\"String\",\"StringValue\":\"application/json;charset=UTF-8\"},\"eventType\":{\"DataType\":\"String\",\"StringValue\":\"EVENT_TYPE_CREATE_CARD_REQUEST\"}}}"

// ctl localstack sqs send-message --queue-url http://localstack:30066/000000000000/local-cards --message-body "{\"Message\":\"\\\"CiQwYzkzNjc5NS0xM2JjLTRlODctOWNlMS1mMjM3MzI4OGM4ZWUSDAigxZuaBhDA5JXQAhgxOogBCiQwYzkzNjc5NS0xM2JjLTRlODctOWNlMS1mMjM3MzI4OGM4ZWUaDAigxZuaBhCA197OAiAxKlAKJDZmYWQ4Yzk0LTgzNWQtNGY5Yy1iNmFkLTE3MzBmMmJiNGM3NhIkMGM5MzY3OTUtMTNiYy00ZTg3LTljZTEtZjIzNzMyODhjOGVlIgBCANIBEhIQCICxdRABIghjYW5jZWxlZA==\\\"\",\"MessageAttributes\":{\"contentType\":{\"DataType\":\"String\",\"StringValue\":\"application/json;charset=UTF-8\"},\"eventType\":{\"DataType\":\"String\",\"StringValue\":\"EVENT_TYPE_UPDATE_CARD_REQUEST\"}}}"