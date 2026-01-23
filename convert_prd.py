
import xml.etree.ElementTree as ET
import os

try:
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    tree = ET.parse('PRD1_extracted/word/document.xml')
    root = tree.getroot()
    body = root.find('w:body', ns)
    
    lines = []
    
    # Iterate over paragraphs
    for p in body.findall('.//w:p', ns):
        p_text = ''
        # Iterate over runs
        for r in p.findall('w:r', ns):
            t = r.find('w:t', ns)
            if t is not None and t.text:
                p_text += t.text
        
        # Add a newline after each paragraph
        if p_text:
            lines.append(p_text)
            
    with open('PRD1.md', 'w', encoding='utf-8') as f:
        f.write('\n\n'.join(lines))
        
    print("Conversion successful")
    
except Exception as e:
    print(f"Error: {e}")
