import { compose, lifecycle, withProps } from 'recompose';
import {parseString} from 'xml2js';

import NutritionCalculator from "./NutritionCalculator";

// Mock data
const xml = `
<LivsmedelsLista>
  <Livsmedel>
    <Nummer>422</Nummer>
    <Namn>Tomater krossade konserv m lag</Namn>
    <ViktGram>100</ViktGram>
    <Naringsvarden>
      <Naringsvarde>
        <Namn>Summa mättade fettsyror</Namn>
        <Forkortning>Mfet</Forkortning>
        <Varde>0,04</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2006-01-09T10:18:06.24</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Summa enkelomättade fettsyror</Namn>
        <Forkortning>Mone</Forkortning>
        <Varde>0,02</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2006-01-09T10:18:06.24</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Summa fleromättade fettsyror</Namn>
        <Forkortning>Pole</Forkortning>
        <Varde>0,10</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2006-01-09T10:18:06.24</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Fettsyra 4:0-10:0</Namn>
        <Forkortning>C4:0-C10:0</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2006-01-09T10:18:06.24</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Laurinsyra C12:0</Namn>
        <Forkortning>C12:0</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2006-01-09T10:18:06.24</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Myristinsyra C14:0</Namn>
        <Forkortning>C14:0</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2006-01-09T10:18:06.24</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Palmitinsyra C16:0</Namn>
        <Forkortning>C16:0</Forkortning>
        <Varde>0,03</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2006-01-09T10:18:06.24</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Stearinsyra C18:0</Namn>
        <Forkortning>C18:0</Forkortning>
        <Varde>0,01</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2006-01-09T10:18:06.24</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Arakidinsyra C20:0</Namn>
        <Forkortning>C20:0</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2006-01-09T10:18:06.24</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Palmitoljesyra C16:1</Namn>
        <Forkortning>C16:1</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2006-01-09T10:18:06.24</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Oljesyra C18:1</Namn>
        <Forkortning>C18:1</Forkortning>
        <Varde>0,02</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2006-01-09T10:18:06.24</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Linolsyra C18:2</Namn>
        <Forkortning>C18:2</Forkortning>
        <Varde>0,09</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2006-01-09T10:18:06.24</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Linolensyra C18:3</Namn>
        <Forkortning>C18:3</Forkortning>
        <Varde>0,01</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2006-01-09T10:18:06.24</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Arakidonsyra C20:4</Namn>
        <Forkortning>C20:4</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2006-01-09T10:18:06.24</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>EPA (C20:5)</Namn>
        <Forkortning>C20:5</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2006-01-09T10:18:06.24</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>DPA (C22:5)</Namn>
        <Forkortning>C22:5</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2006-01-09T10:18:06.24</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>DHA (C22:6)</Namn>
        <Forkortning>C22:6</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2006-01-09T10:18:06.24</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Kolesterol</Namn>
        <Forkortning>Kole</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2006-01-09T10:18:06.24</SenastAndrad>
        <Vardetyp>Logisk nolla</Vardetyp>
        <Ursprung>Annat ursprung</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Framtagningsmetod>Skattat logisk slutledning</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Monosackarider</Namn>
        <Forkortning>Msac</Forkortning>
        <Varde>3,65</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2017-06-28T13:06:21.627</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Monosackarider beräknade som summan av glukos och fruktos</Metodtyp>
        <Framtagningsmetod>Summering av beståndsdelar</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Disackarider</Namn>
        <Forkortning>Dsac</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2017-06-28T13:06:21.627</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Disackarider beräknade som summan av laktos, maltos och sackaros</Metodtyp>
        <Framtagningsmetod>Summering av beståndsdelar</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Sackaros</Namn>
        <Forkortning>Sack</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2013-05-30T07:57:26.7</SenastAndrad>
        <Vardetyp>Medelvärde </Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>GC sockerarter</Metodtyp>
        <Framtagningsmetod>Aggregering av analyserade värden</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Energi (kJ)</Namn>
        <Forkortning>Enkj</Forkortning>
        <Varde>94</Varde>
        <Enhet>kJ</Enhet>
        <SenastAndrad>2017-06-28T13:06:21.627</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Energiberäkning kJ NNR</Metodtyp>
        <Framtagningsmetod>Beräknad, omräkningsfaktor inkluderad</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Energi (kcal)</Namn>
        <Forkortning>Ener</Forkortning>
        <Varde>22</Varde>
        <Enhet>kcal</Enhet>
        <SenastAndrad>2017-06-28T13:06:21.627</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Energiberäkning kcal NNR</Metodtyp>
        <Framtagningsmetod>Beräknad, omräkningsfaktor inkluderad</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Aska</Namn>
        <Forkortning>Aska</Forkortning>
        <Varde>0,69</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2013-05-30T07:57:26.7</SenastAndrad>
        <Vardetyp>Medelvärde </Vardetyp>
        <Ursprung>Analys, oberoende labb</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>NMKL 23, vatten</Metodtyp>
        <Framtagningsmetod>Aggregering av analyserade värden</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Vatten</Namn>
        <Forkortning>Vatt</Forkortning>
        <Varde>93,35</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2013-05-30T07:57:26.7</SenastAndrad>
        <Vardetyp>Medelvärde </Vardetyp>
        <Ursprung>Analys, oberoende labb</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>Svensk standard 191011</Metodtyp>
        <Framtagningsmetod>Aggregering av analyserade värden</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Kolhydrater</Namn>
        <Forkortning>Kolh</Forkortning>
        <Varde>3,70</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2017-06-28T13:06:21.627</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Kolhydrater, tillgängliga beräknat som differens</Metodtyp>
        <Framtagningsmetod>Summering av beståndsdelar</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Protein</Namn>
        <Forkortning>Prot</Forkortning>
        <Varde>0,81</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2017-06-28T13:06:21.627</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Protein beräknat från proteinkväve</Metodtyp>
        <Framtagningsmetod>Beräknad, omräkningsfaktor inkluderad</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Alkohol</Namn>
        <Forkortning>Alko</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2013-05-30T07:57:26.7</SenastAndrad>
        <Vardetyp>Logisk nolla</Vardetyp>
        <Ursprung>Annat ursprung</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Framtagningsmetod>Skattat logisk slutledning</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Fibrer</Namn>
        <Forkortning>Fibe</Forkortning>
        <Varde>1,23</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2013-05-30T07:57:26.7</SenastAndrad>
        <Vardetyp>Medelvärde </Vardetyp>
        <Ursprung>Analys, oberoende labb</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>AOAC 985.29:1995</Metodtyp>
        <Framtagningsmetod>Aggregering av analyserade värden</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Fett</Namn>
        <Forkortning>Fett</Forkortning>
        <Varde>0,20</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2013-05-30T07:57:26.7</SenastAndrad>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Fosfor</Namn>
        <Forkortning>P</Forkortning>
        <Varde>22,0</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2013-05-30T07:57:26.7</SenastAndrad>
        <Vardetyp>Medelvärde </Vardetyp>
        <Ursprung>Analys, oberoende labb</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>ICP-OES, ISO metod 11885:2007</Metodtyp>
        <Framtagningsmetod>Aggregering av analyserade värden</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Jod</Namn>
        <Forkortning>I</Forkortning>
        <Varde>3,0</Varde>
        <Enhet>µg</Enhet>
        <SenastAndrad>2017-05-12T13:41:29.61</SenastAndrad>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Framtagningsmetod>Allmän analys</Framtagningsmetod>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Järn</Namn>
        <Forkortning>Fe</Forkortning>
        <Varde>0,570</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2014-10-06T16:01:46.533</SenastAndrad>
        <Vardetyp>Medelvärde </Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>ICP-MS</Metodtyp>
        <Framtagningsmetod>Aggregering av analyserade värden</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Kalcium</Namn>
        <Forkortning>Ca</Forkortning>
        <Varde>12,0</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2013-05-30T07:57:26.7</SenastAndrad>
        <Vardetyp>Medelvärde </Vardetyp>
        <Ursprung>Analys, oberoende labb</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>ICP-OES, ISO metod 11885:2007</Metodtyp>
        <Framtagningsmetod>Aggregering av analyserade värden</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Kalium</Namn>
        <Forkortning>K</Forkortning>
        <Varde>295,0</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2013-05-30T07:57:26.7</SenastAndrad>
        <Vardetyp>Medelvärde </Vardetyp>
        <Ursprung>Analys, oberoende labb</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>ICP-OES, ISO metod 11885:2007</Metodtyp>
        <Framtagningsmetod>Aggregering av analyserade värden</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Magnesium</Namn>
        <Forkortning>Mg</Forkortning>
        <Varde>12,5</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2013-05-30T07:57:26.7</SenastAndrad>
        <Vardetyp>Medelvärde </Vardetyp>
        <Ursprung>Analys, oberoende labb</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>ICP-OES, ISO metod 11885:2007</Metodtyp>
        <Framtagningsmetod>Aggregering av analyserade värden</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Natrium</Namn>
        <Forkortning>Na</Forkortning>
        <Varde>15,5</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2013-05-30T07:57:26.7</SenastAndrad>
        <Vardetyp>Medelvärde </Vardetyp>
        <Ursprung>Analys, oberoende labb</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>ICP-OES, ISO metod 11885:2007</Metodtyp>
        <Framtagningsmetod>Aggregering av analyserade värden</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Selen</Namn>
        <Forkortning>Se</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>µg</Enhet>
        <SenastAndrad>2013-05-30T07:57:26.7</SenastAndrad>
        <Vardetyp>Medelvärde </Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>ICP-MS</Metodtyp>
        <Framtagningsmetod>Aggregering av analyserade värden</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Zink</Namn>
        <Forkortning>Zn</Forkortning>
        <Varde>0,130</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2013-05-30T07:57:26.7</SenastAndrad>
        <Vardetyp>Medelvärde </Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>ICP-MS</Metodtyp>
        <Framtagningsmetod>Aggregering av analyserade värden</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Vitamin A</Namn>
        <Forkortning>VitA</Forkortning>
        <Varde>28,5</Varde>
        <Enhet>µg</Enhet>
        <SenastAndrad>2017-06-28T13:06:21.627</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Vitamin A aktivitetNNR 2004</Metodtyp>
        <Framtagningsmetod>Beräknad, omräkningsfaktor inkluderad</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Retinol</Namn>
        <Forkortning>Reti</Forkortning>
        <Varde>0,0</Varde>
        <Enhet>µg</Enhet>
        <SenastAndrad>2017-06-28T13:06:21.627</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Retinol beräknat enbart från transretinol</Metodtyp>
        <Framtagningsmetod>Summering av beståndsdelar</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Vitamin D</Namn>
        <Forkortning>VitD</Forkortning>
        <Varde>0,000</Varde>
        <Enhet>µg</Enhet>
        <SenastAndrad>2017-06-28T13:06:21.627</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Vit D  från D2 och D3</Metodtyp>
        <Framtagningsmetod>Summering av beståndsdelar</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Vitamin E</Namn>
        <Forkortning>VitE</Forkortning>
        <Varde>1,64</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2017-06-28T13:06:21.627</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Vit E från alfatokoferol</Metodtyp>
        <Framtagningsmetod>Summering av beståndsdelar</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>β-Karoten</Namn>
        <Forkortning>b-Kar</Forkortning>
        <Varde>342</Varde>
        <Enhet>µg</Enhet>
        <SenastAndrad>2013-05-30T07:57:26.7</SenastAndrad>
        <Vardetyp>Medelvärde </Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>HPLC-DAD karotenoider</Metodtyp>
        <Framtagningsmetod>Aggregering av analyserade värden</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Tiamin</Namn>
        <Forkortning>Tiam</Forkortning>
        <Varde>0,040</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2013-05-30T07:57:26.7</SenastAndrad>
        <Vardetyp>Medelvärde </Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>HPLC-FLD tiamin, riboflavin, vitamin B6, vitamin C</Metodtyp>
        <Framtagningsmetod>Aggregering av analyserade värden</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Riboflavin</Namn>
        <Forkortning>Ribo</Forkortning>
        <Varde>0,020</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2013-05-30T07:57:26.7</SenastAndrad>
        <Vardetyp>Medelvärde </Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>HPLC-FLD tiamin, riboflavin, vitamin B6, vitamin C</Metodtyp>
        <Framtagningsmetod>Aggregering av analyserade värden</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Vitamin C</Namn>
        <Forkortning>VitC</Forkortning>
        <Varde>15,0</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2014-10-06T16:01:46.533</SenastAndrad>
        <Vardetyp>Medelvärde </Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>HPLC-EC vitamin C och sockerarter</Metodtyp>
        <Framtagningsmetod>Aggregering av analyserade värden</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Niacin</Namn>
        <Forkortning>Niac</Forkortning>
        <Varde>0,94</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2013-05-30T07:57:26.7</SenastAndrad>
        <Vardetyp>Medelvärde </Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>Lactobacillus plantarum, niacin</Metodtyp>
        <Framtagningsmetod>Aggregering av analyserade värden</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Niacinekvivalenter</Namn>
        <Forkortning>Niek</Forkortning>
        <Varde>1,10</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2017-06-28T13:06:21.627</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Niacinekvivalenter</Metodtyp>
        <Framtagningsmetod>Beräknad, omräkningsfaktor inkluderad</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Vitamin B12</Namn>
        <Forkortning>VitB12</Forkortning>
        <Varde>0,000</Varde>
        <Enhet>µg</Enhet>
        <SenastAndrad>2013-05-30T07:57:26.7</SenastAndrad>
        <Vardetyp>Logisk nolla</Vardetyp>
        <Ursprung>Annat ursprung</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Framtagningsmetod>Skattat logisk slutledning</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Vitamin B6</Namn>
        <Forkortning>VitB6</Forkortning>
        <Varde>0,130</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2014-10-06T16:01:46.533</SenastAndrad>
        <Vardetyp>Medelvärde </Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>HPLC-FLD tiamin, riboflavin, vitamin B6, vitamin C</Metodtyp>
        <Framtagningsmetod>Aggregering av analyserade värden</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Folat</Namn>
        <Forkortning>Folat</Forkortning>
        <Varde>28,1</Varde>
        <Enhet>µg</Enhet>
        <SenastAndrad>2013-05-30T07:57:26.7</SenastAndrad>
        <Vardetyp>Medelvärde </Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>Lactobacillus casei, folat, riboflavin</Metodtyp>
        <Framtagningsmetod>Aggregering av analyserade värden</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
        <Kommentar>4944 Tomater krossade tetrapack och 4945 tomater krossade konserv</Kommentar>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Socker totalt</Namn>
        <Forkortning>Mono/disack</Forkortning>
        <Varde>3,6</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2017-06-28T13:06:21.627</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Summa sockerarter beräknade som summan av glukos, fruktos, laktos, maltos och sackaros</Metodtyp>
        <Framtagningsmetod>Summering av beståndsdelar</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Fullkorn totalt</Namn>
        <Forkortning>Fullk/tot</Forkortning>
        <Varde>0</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2017-06-28T13:06:21.627</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Skattat från ingrediensförteckning</Metodtyp>
        <Framtagningsmetod>Summering av beståndsdelar</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Salt</Namn>
        <Forkortning>NaCl</Forkortning>
        <Varde>0,04</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2017-06-28T13:06:21.627</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Salt beräknat från natrium (totalt)</Metodtyp>
        <Framtagningsmetod>Beräknad, omräkningsfaktor inkluderad</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
    </Naringsvarden>
  </Livsmedel>
  <Livsmedel>
    <Nummer>372</Nummer>
    <Namn>Aubergine</Namn>
    <ViktGram>100</ViktGram>
    <Naringsvarden>
      <Naringsvarde>
        <Namn>Summa mättade fettsyror</Namn>
        <Forkortning>Mfet</Forkortning>
        <Varde>0,02</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2005-12-29T13:54:14.147</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Summa enkelomättade fettsyror</Namn>
        <Forkortning>Mone</Forkortning>
        <Varde>0,01</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2005-12-29T13:54:14.147</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Summa fleromättade fettsyror</Namn>
        <Forkortning>Pole</Forkortning>
        <Varde>0,04</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2005-12-29T13:54:14.147</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Fettsyra 4:0-10:0</Namn>
        <Forkortning>C4:0-C10:0</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2005-12-29T13:54:14.147</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Laurinsyra C12:0</Namn>
        <Forkortning>C12:0</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2005-12-29T13:54:14.147</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Myristinsyra C14:0</Namn>
        <Forkortning>C14:0</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2005-12-29T13:54:14.147</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Palmitinsyra C16:0</Namn>
        <Forkortning>C16:0</Forkortning>
        <Varde>0,01</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2005-12-29T13:54:14.147</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Stearinsyra C18:0</Namn>
        <Forkortning>C18:0</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2005-12-29T13:54:14.147</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Arakidinsyra C20:0</Namn>
        <Forkortning>C20:0</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2005-12-29T13:54:14.147</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Palmitoljesyra C16:1</Namn>
        <Forkortning>C16:1</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2005-12-29T13:54:14.147</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Oljesyra C18:1</Namn>
        <Forkortning>C18:1</Forkortning>
        <Varde>0,01</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2005-12-29T13:54:14.147</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Linolsyra C18:2</Namn>
        <Forkortning>C18:2</Forkortning>
        <Varde>0,03</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2005-12-29T13:54:14.147</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Linolensyra C18:3</Namn>
        <Forkortning>C18:3</Forkortning>
        <Varde>0,01</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2005-12-29T13:54:14.147</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Arakidonsyra C20:4</Namn>
        <Forkortning>C20:4</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2005-12-29T13:54:14.147</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>EPA (C20:5)</Namn>
        <Forkortning>C20:5</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2005-12-29T13:54:14.147</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>DPA (C22:5)</Namn>
        <Forkortning>C22:5</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2005-12-29T13:54:14.147</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>DHA (C22:6)</Namn>
        <Forkortning>C22:6</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2005-12-29T13:54:14.147</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Kolesterol</Namn>
        <Forkortning>Kole</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2005-12-29T13:54:14.147</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Monosackarider</Namn>
        <Forkortning>Msac</Forkortning>
        <Varde>2,40</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2017-05-12T13:49:14.173</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Monosackarider beräknade som summan av glukos och fruktos</Metodtyp>
        <Framtagningsmetod>Summering av beståndsdelar</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Disackarider</Namn>
        <Forkortning>Dsac</Forkortning>
        <Varde>0,20</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2017-05-12T13:49:14.173</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Disackarider beräknade som summan av laktos, maltos och sackaros</Metodtyp>
        <Framtagningsmetod>Summering av beståndsdelar</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Sackaros</Namn>
        <Forkortning>Sack</Forkortning>
        <Varde>0,20</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Ett analysvärde av sammansatt prov</Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>GC sockerarter</Metodtyp>
        <Framtagningsmetod>Analysresultat</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Energi (kJ)</Namn>
        <Forkortning>Enkj</Forkortning>
        <Varde>79</Varde>
        <Enhet>kJ</Enhet>
        <SenastAndrad>2017-05-12T13:49:14.173</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Energiberäkning kJ NNR</Metodtyp>
        <Framtagningsmetod>Beräknad, omräkningsfaktor inkluderad</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Energi (kcal)</Namn>
        <Forkortning>Ener</Forkortning>
        <Varde>19</Varde>
        <Enhet>kcal</Enhet>
        <SenastAndrad>2017-05-12T13:49:14.173</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Energiberäkning kcal NNR</Metodtyp>
        <Framtagningsmetod>Beräknad, omräkningsfaktor inkluderad</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Aska</Namn>
        <Forkortning>Aska</Forkortning>
        <Varde>0,52</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Ett analysvärde av sammansatt prov</Vardetyp>
        <Ursprung>Analys, oberoende labb</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>NMKL 23, vatten</Metodtyp>
        <Framtagningsmetod>Analysresultat</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Vatten</Namn>
        <Forkortning>Vatt</Forkortning>
        <Varde>93,70</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Ett analysvärde av sammansatt prov</Vardetyp>
        <Ursprung>Analys, oberoende labb</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>Svensk standard 191011</Metodtyp>
        <Framtagningsmetod>Analysresultat</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Kolhydrater</Namn>
        <Forkortning>Kolh</Forkortning>
        <Varde>2,20</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2017-05-12T13:49:14.173</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Kolhydrater, tillgängliga beräknat som differens</Metodtyp>
        <Framtagningsmetod>Summering av beståndsdelar</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Protein</Namn>
        <Forkortning>Prot</Forkortning>
        <Varde>1,13</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2017-05-12T13:49:14.173</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Protein beräknat från proteinkväve</Metodtyp>
        <Framtagningsmetod>Beräknad, omräkningsfaktor inkluderad</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Alkohol</Namn>
        <Forkortning>Alko</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Logisk nolla</Vardetyp>
        <Ursprung>Annat ursprung</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Framtagningsmetod>Skattat logisk slutledning</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Fibrer</Namn>
        <Forkortning>Fibe</Forkortning>
        <Varde>2,35</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Ett analysvärde av sammansatt prov</Vardetyp>
        <Ursprung>Analys, oberoende labb</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>AOAC 985.29:1995</Metodtyp>
        <Framtagningsmetod>Analysresultat</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Fett</Namn>
        <Forkortning>Fett</Forkortning>
        <Varde>0,10</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Livsmedelstabell</Ursprung>
        <Publikation>USA 1976-84</Publikation>
        <Framtagningsmetod>Överfört från likvärdigt livsmedel</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Fosfor</Namn>
        <Forkortning>P</Forkortning>
        <Varde>24,0</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Ett analysvärde av sammansatt prov</Vardetyp>
        <Ursprung>Analys, oberoende labb</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>ICP-OES, ISO metod 11885:2007</Metodtyp>
        <Framtagningsmetod>Analysresultat</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Jod</Namn>
        <Forkortning>I</Forkortning>
        <Varde>0,1</Varde>
        <Enhet>µg</Enhet>
        <SenastAndrad>2017-05-12T13:49:14.173</SenastAndrad>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Järn</Namn>
        <Forkortning>Fe</Forkortning>
        <Varde>0,210</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Ett analysvärde av sammansatt prov</Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>ICP-MS</Metodtyp>
        <Framtagningsmetod>Analysresultat</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Kalcium</Namn>
        <Forkortning>Ca</Forkortning>
        <Varde>10,0</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Ett analysvärde av sammansatt prov</Vardetyp>
        <Ursprung>Analys, oberoende labb</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>ICP-OES, ISO metod 11885:2007</Metodtyp>
        <Framtagningsmetod>Analysresultat</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Kalium</Namn>
        <Forkortning>K</Forkortning>
        <Varde>210,0</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Ett analysvärde av sammansatt prov</Vardetyp>
        <Ursprung>Analys, oberoende labb</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>ICP-OES, ISO metod 11885:2007</Metodtyp>
        <Framtagningsmetod>Analysresultat</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Magnesium</Namn>
        <Forkortning>Mg</Forkortning>
        <Varde>14,0</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Ett analysvärde av sammansatt prov</Vardetyp>
        <Ursprung>Analys, oberoende labb</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>ICP-OES, ISO metod 11885:2007</Metodtyp>
        <Framtagningsmetod>Analysresultat</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Natrium</Namn>
        <Forkortning>Na</Forkortning>
        <Varde>2,0</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Ett analysvärde av sammansatt prov</Vardetyp>
        <Ursprung>Analys, oberoende labb</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>ICP-OES, ISO metod 11885:2007</Metodtyp>
        <Framtagningsmetod>Analysresultat</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Selen</Namn>
        <Forkortning>Se</Forkortning>
        <Varde>0,00</Varde>
        <Enhet>µg</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Under detektionsgränsen</Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>ICP-MS</Metodtyp>
        <Framtagningsmetod>Analysresultat</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Zink</Namn>
        <Forkortning>Zn</Forkortning>
        <Varde>0,160</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Ett analysvärde av sammansatt prov</Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>ICP-MS</Metodtyp>
        <Framtagningsmetod>Analysresultat</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Vitamin A</Namn>
        <Forkortning>VitA</Forkortning>
        <Varde>2,6</Varde>
        <Enhet>µg</Enhet>
        <SenastAndrad>2017-05-12T13:49:14.173</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Vitamin A aktivitetNNR 2004</Metodtyp>
        <Framtagningsmetod>Beräknad, omräkningsfaktor inkluderad</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Retinol</Namn>
        <Forkortning>Reti</Forkortning>
        <Varde>0,0</Varde>
        <Enhet>µg</Enhet>
        <SenastAndrad>2017-05-12T13:49:14.173</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Retinol beräknat enbart från transretinol</Metodtyp>
        <Framtagningsmetod>Summering av beståndsdelar</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Vitamin D</Namn>
        <Forkortning>VitD</Forkortning>
        <Varde>0,000</Varde>
        <Enhet>µg</Enhet>
        <SenastAndrad>2017-05-12T13:49:14.173</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Vit D  från D2 och D3</Metodtyp>
        <Framtagningsmetod>Summering av beståndsdelar</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Vitamin E</Namn>
        <Forkortning>VitE</Forkortning>
        <Varde>0,09</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2017-05-12T13:49:14.173</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Vit E från alfatokoferol</Metodtyp>
        <Framtagningsmetod>Summering av beståndsdelar</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>β-Karoten</Namn>
        <Forkortning>b-Kar</Forkortning>
        <Varde>31</Varde>
        <Enhet>µg</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Ett analysvärde av sammansatt prov</Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>HPLC-DAD karotenoider</Metodtyp>
        <Framtagningsmetod>Analysresultat</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Tiamin</Namn>
        <Forkortning>Tiam</Forkortning>
        <Varde>0,020</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Ett analysvärde av sammansatt prov</Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>HPLC-FLD tiamin, riboflavin, vitamin B6, vitamin C</Metodtyp>
        <Framtagningsmetod>Analysresultat</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Riboflavin</Namn>
        <Forkortning>Ribo</Forkortning>
        <Varde>0,000</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Under detektionsgränsen</Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>HPLC-FLD tiamin, riboflavin, vitamin B6, vitamin C</Metodtyp>
        <Framtagningsmetod>Analysresultat</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Vitamin C</Namn>
        <Forkortning>VitC</Forkortning>
        <Varde>3,3</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Ett analysvärde av sammansatt prov</Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>HPLC-EC vitamin C och sockerarter</Metodtyp>
        <Framtagningsmetod>Analysresultat</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Niacin</Namn>
        <Forkortning>Niac</Forkortning>
        <Varde>0,58</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Ett analysvärde av sammansatt prov</Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>Lactobacillus plantarum, niacin</Metodtyp>
        <Framtagningsmetod>Analysresultat</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Niacinekvivalenter</Namn>
        <Forkortning>Niek</Forkortning>
        <Varde>0,80</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2017-05-12T13:49:14.173</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Niacinekvivalenter</Metodtyp>
        <Framtagningsmetod>Beräknad, omräkningsfaktor inkluderad</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Vitamin B12</Namn>
        <Forkortning>VitB12</Forkortning>
        <Varde>0,000</Varde>
        <Enhet>µg</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Logisk nolla</Vardetyp>
        <Ursprung>Annat ursprung</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Framtagningsmetod>Skattat logisk slutledning</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Vitamin B6</Namn>
        <Forkortning>VitB6</Forkortning>
        <Varde>0,040</Varde>
        <Enhet>mg</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Ett analysvärde av sammansatt prov</Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>HPLC-FLD tiamin, riboflavin, vitamin B6, vitamin C</Metodtyp>
        <Framtagningsmetod>Analysresultat</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Folat</Namn>
        <Forkortning>Folat</Forkortning>
        <Varde>21,3</Varde>
        <Enhet>µg</Enhet>
        <SenastAndrad>2013-05-15T12:24:15.96</SenastAndrad>
        <Vardetyp>Ett analysvärde av sammansatt prov</Vardetyp>
        <Ursprung>Analys SLV</Ursprung>
        <Publikation>Analysprotokoll Dnr 4717/2011</Publikation>
        <Metodtyp>Lactobacillus casei, folat, riboflavin</Metodtyp>
        <Framtagningsmetod>Analysresultat</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Socker totalt</Namn>
        <Forkortning>Mono/disack</Forkortning>
        <Varde>2,6</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2017-06-28T12:57:24.993</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Summa sockerarter beräknade som summan av glukos, fruktos, laktos, maltos och sackaros</Metodtyp>
        <Framtagningsmetod>Summering av beståndsdelar</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Fullkorn totalt</Namn>
        <Forkortning>Fullk/tot</Forkortning>
        <Varde>0</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2017-05-12T13:49:14.173</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Skattat från ingrediensförteckning</Metodtyp>
        <Framtagningsmetod>Summering av beståndsdelar</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
      <Naringsvarde>
        <Namn>Salt</Namn>
        <Forkortning>NaCl</Forkortning>
        <Varde>0,01</Varde>
        <Enhet>g</Enhet>
        <SenastAndrad>2017-05-12T13:49:14.173</SenastAndrad>
        <Vardetyp>Bästa skattning</Vardetyp>
        <Ursprung>Värde framtaget med eget system</Ursprung>
        <Publikation>SLV - Riktlinjer för livsmedel </Publikation>
        <Metodtyp>Salt beräknat från natrium (totalt)</Metodtyp>
        <Framtagningsmetod>Beräknad, omräkningsfaktor inkluderad</Framtagningsmetod>
        <Referenstyp>Rapport</Referenstyp>
      </Naringsvarde>
    </Naringsvarden>
  </Livsmedel>
</LivsmedelsLista>`;

// Convert from xml to json
function convertData() {   
  // Return a new promise.
  return new Promise(function(resolve, reject) {

    parseString(xml, function (err, result) {

      const array = [];
      const foods = result.LivsmedelsLista.Livsmedel;

      for(let food in foods){

        array.push({ 
          lmvId: foods[food]['Nummer'][0], 
          name: foods[food]['Namn'][0],
          nutrition: foods[food]['Naringsvarden'][0]['Naringsvarde']
        })
      }
      resolve(array);
    })
    
  });

};

// Mock column headers
const columns = [
  {
    Header: "Generellt",
    columns: [
      {
        Header: "Namn",
        accessor: "name"
      },
      {
        Header: "Id",
        accessor: 'lmvId'
      },
      {
        Header: 'Energi (kcal)',
        accessor: 'nutrition[22].Varde[0]'
      }
    ]
  },
  {
    Header: "Makromolekyler",
    columns: [
      {
        Header: 'Kolhydrater (g)',
        accessor: 'nutrition[25].Varde[0]'
      }, {
        Header: 'Protein (g)',
        accessor: 'nutrition[26].Varde[0]'
      }, {
        Header: 'Fett (g)',
        accessor: 'nutrition[29].Varde[0]'
      }, {
        Header: 'Fibrer (g)',
        accessor: 'nutrition[28].Varde[0]'
      }
    ]
  }, 
  {
    Header: "Vitaminer",
    columns: [
      {
        Header: 'Vitamin B12 (µg)',
        accessor: 'nutrition[49].Varde[0]'
      },
      {
        Header: 'Vitamin B6 (mg)',
        accessor: 'nutrition[50].Varde[0]'
      },
      {
        Header: 'Vitamin C (mg)',
        accessor: 'nutrition[46].Varde[0]'
      },
      {
        Header: 'Riboflavin (mg)',
        accessor: 'nutrition[45].Varde[0]'
      },
      {
        Header: 'Tiamin (mg)',
        accessor: 'nutrition[44].Varde[0]'
      }
    ]
  }

];

export default compose(
  lifecycle({
    state: { foods: [] },
    componentDidMount() {
      convertData().then((data) =>
        this.setState({ foods: data }));
    }
  }),
  withProps({columns})
)(NutritionCalculator);
