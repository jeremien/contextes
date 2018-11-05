import React, { Component } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import { Button, Divider } from 'antd';
class LayoutPublication extends Component {

    pdfExportComponent;

    exportPDF() {
        this.pdfExportComponent.save();
    }

    render() {

        return (
    
            <div> 
                
                <Button.Group>
                    <Button onClick={this.exportPDF.bind(this)}>Exporter en PDF</Button>
                    <Button onClick={() => console.log('texte')}>Exporter en Texte brut</Button>
                    <Button onClick={() => console.log('image')}>Exporter en Image</Button>
                </Button.Group>
                
                <Divider/>
                
                <PDFExport 
                    fileName={`${this.props.date}-${this.props.titre}.pdf`}
                    title={`${this.props.titre}`}
                    subject={`${this.props.titre}`}
                    keywords='mots'
                    ref={(component) => this.pdfExportComponent = component} 
                    paperSize='A4'
                    margin='1cm'
                >

                    <div>
                        <h2>{this.props.titre}</h2>
                        {this.props.data}
                    </div>
                
                </PDFExport>

               
    
            </div>
        )


    }

 

}


export default LayoutPublication;