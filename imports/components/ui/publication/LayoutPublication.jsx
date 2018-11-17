import React, { Component } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import { Button, Divider } from 'antd';
import ReactMarkdown from 'react-markdown';

class LayoutPublication extends Component {

    pdfExportComponent;

    exportPDF() {
        this.pdfExportComponent.save();
    }

    render() {

        // console.log(this.props.data)

        return (
    
            <div className='layout'> 
                
                <Button.Group>
                    <Button onClick={this.exportPDF.bind(this)}>Exporter en PDF</Button>
                    <Button onClick={() => console.log('texte')} disabled>Exporter en Texte brut</Button>
                    <Button onClick={() => console.log('image')} disabled>Exporter en Image</Button>
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

                    <div >
                        <h2>{this.props.titre}</h2>
                        <ReactMarkdown 
                            source={this.props.data} 
                        />
                    </div>
                
                </PDFExport>

               
    
            </div>
        )


    }

 

}


export default LayoutPublication;