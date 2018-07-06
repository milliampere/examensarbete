import React, { Component } from 'react';
import './Help.css';

const helpText = (
    <div>
        <h4 className="help-heading">Personligt resultat</h4>
        <p>Resultaten baseras på dina personliga uppgifter som du fyller i ovan. Dessa värden används för att räkna ut vilket energibehov du har på en dag, med bibehållen vikt. Vi har räknat ut basala metabolism (basal metabolic rate, BMR) med hjälp av MD Mifflins ekvation och multiplicerat detta värde med PAL (physical activity level).</p>
        <h4 className="help-heading">Saknade värden / resultat</h4>
        <p>Om du inte får upp det resultat du förväntar dig kan du själv skriva in antal, mått och livsmedel i inputfälten. Du kan även ändra antalet portioner uppe till vänster. Om ett mått inte finns inlagt i vår databas, så som exempelvis kruka, port men ibland även dl, styck osv så ändra antal och mått så att det är angivet i antal gram. Datan vi använder för detta plugin är taget från livsmedelsverkets databas, där är alla produkter angivna i gram, vi jobbar på att få in fler mått för varje livsmedel i vår egna databas.</p>
        <p>Vi har ca 1000 livsmedel sparade i databasen. Får du inte fram det livsmedel du förväntar dig, prova att skriv in en liknande/motsvarande produkt. För närvarande saknas bla kryddor och bröd i databasen då de inte finns med i Livsmedelsverkets databas.</p>
        <p>Håll muspekaren över respektive näringsämne och resulat för att se mer info om dem.</p>
    </div>
)

class Help extends Component {

    componentDidMount() {
		window.scrollTo(0,document.body.scrollHeight);
    }

    componentWillUnmount() {
        window.scrollTo(0,0);
    }

    render() {
        return (
            <div className="help">
                {helpText}
                <button className="contact_button" onClick={this.props.sendEmail}>Kontakta oss</button>
            </div>
        );
    }
}

export default Help;