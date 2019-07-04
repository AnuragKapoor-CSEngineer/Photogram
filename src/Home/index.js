import React from 'react'
import { Grid, Card, Button, Image } from 'semantic-ui-react';
const getCard = (db, d) => {
    if (db.length !== 0) {

        return (
            db.map((item, i) => {
                return (
                    <Grid.Column width={5} key={i}>
                        <Card>
                            <Image src={`/${item.image}`} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{item.title}</Card.Header>
                                <Card.Meta>
                                    <span className='date'>{item.subtitle}</span>
                                </Card.Meta>
                                <Card.Description>
                                    {item.description}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra textAlign="center">
                                <Button color="blue" onClick={() => { d(item, i) }} >Delete </Button>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                )
            })
        )
    }
    else {
        return (
            <div style={{ color: "white" }} >
                <h1 textAlign="center">Please upload some data</h1>
            </div>
        )
    }
}
export default function index({ db, d }) {

    return (
        <div>
            <Grid>
                {getCard(db, d)}
            </Grid>
        </div>
    )
}

