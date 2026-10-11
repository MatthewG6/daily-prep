const paths={
  spark:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"/>',
  book:'<path d="M3 4h6a3 3 0 0 1 3 3v14a4 4 0 0 0-4-2H3Zm9 3a3 3 0 0 1 3-3h6v15h-5a4 4 0 0 0-4 2"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-13 4h2m4 0h2"/>',
  basket:'<path d="m7 9 5-6 5 6M3 9h18l-2 12H5Zm6 4v4m6-4v4"/>',
  user:'<circle cx="12" cy="7" r="4"/><path d="M4 21v-3a8 8 0 0 1 16 0v3"/>',
  heart:'<path d="M20.5 4.5a5 5 0 0 0-7 0L12 6l-1.5-1.5a5 5 0 0 0-7 7L12 20l8.5-8.5a5 5 0 0 0 0-7Z"/>',
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',
  check:'<path d="m5 12 4 4L19 6"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',
  arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',chevron:'<path d="m9 5 7 7-7 7"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  sliders:'<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="8" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="10" cy="18" r="2"/>',
  trash:'<path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7"/>',
  pantry:'<rect x="5" y="5" width="14" height="16" rx="3"/><path d="M7 3h10M5 11h14m-9 4h4"/>',
  shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/>',
};
export const icon=(name,cls='')=>`<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.spark}</svg>`;

// Original vector illustrations: no remote images or pretend recipe photography.
export function foodArt(family='bowls',seed=0){
  const greens=['#64d899','#38c9a8','#8dd86e'][seed%3], sauce=['#ff995e','#ffce69','#ed829b'][seed%3];
  const leaf=`<ellipse cx="112" cy="89" rx="20" ry="12" fill="${greens}" transform="rotate(-25 112 89)"/><ellipse cx="143" cy="75" rx="18" ry="11" fill="${greens}" transform="rotate(20 143 75)"/><ellipse cx="179" cy="94" rx="23" ry="12" fill="${greens}" transform="rotate(-18 179 94)"/>`;
  const dots='<circle cx="119" cy="115" r="9" fill="#ff5e76"/><circle cx="173" cy="115" r="9" fill="#ff5e76"/><circle cx="148" cy="104" r="7" fill="#ffa678"/>';
  let dish;
  if(family==='smoothies')dish=`<path d="M110 41h78l-10 103h-58Z" fill="${seed%2?'#ff86c7':'#9bbdff'}"/><path d="M162 54V18h25" fill="none" stroke="#f4f2ff" stroke-width="7" stroke-linecap="round"/><ellipse cx="149" cy="41" rx="39" ry="9" fill="#eac2ff"/><path d="m130 80 8 4m24 25 7-3m-32 22 5 2" stroke="#fff" opacity=".5" stroke-width="4"/><circle cx="106" cy="134" r="12" fill="#ff5e76"/><path d="m101 122 4 5 6-7" stroke="${greens}" stroke-width="4"/>`;
  else if(family==='toast'||family==='wraps')dish=`<rect x="92" y="46" width="111" height="100" rx="28" fill="#c78a50" transform="rotate(-12 149 96)"/><rect x="100" y="52" width="95" height="87" rx="22" fill="#f5cd90" transform="rotate(-12 149 96)"/><path d="M112 98q30-43 60-19q23 22-15 45q-39 18-45-26" fill="${greens}"/>${dots}<path d="m121 89 31 32m-19-45 31 32" stroke="#a3ebaa" stroke-width="3"/>`;
  else if(family==='tacos')dish=`<path d="M76 116q12-89 68-36l22 58Z" fill="#ecbd69"/><path d="M123 126q18-102 71-35l15 57Z" fill="#ffd386"/><path d="m85 109 14-21 15 20 11-12 13 23" fill="${greens}"/><path d="m139 112 12-21 15 20 13-9 12 28" fill="${greens}"/><circle cx="114" cy="107" r="8" fill="#ff5e76"/><circle cx="172" cy="117" r="8" fill="#ff5e76"/>`;
  else if(family==='burgers')dish=`<path d="M92 81q3-46 57-46t57 46Z" fill="#efb77c"/><path d="m108 52 6 2m22-5 5 2m18 6 6-2m16 9 5-2" stroke="#fff0cd" stroke-width="3" stroke-linecap="round"/><path d="m88 90 17-7 13 10 14-8 17 9 19-9 15 7 24-7v15H88Z" fill="${greens}"/><rect x="93" y="104" width="110" height="17" rx="8" fill="#aa6244"/><path d="m98 101 91-4-18 15-18-12-20 15-14-12" fill="#ffd875"/><path d="M91 128h116q-3 26-29 26h-56q-27 0-31-26" fill="#efb77c"/>`;
  else if(family==='potatoes')dish=`<ellipse cx="149" cy="101" rx="63" ry="42" fill="#b98259" transform="rotate(-12 149 101)"/><ellipse cx="149" cy="97" rx="48" ry="26" fill="#ffe4ab" transform="rotate(-12 149 97)"/>${leaf}${dots}<path d="m126 104 43-6m-27 17 20-2" stroke="#fff" stroke-width="6" stroke-linecap="round"/>`;
  else if(['skillet','tray','eggs'].includes(family))dish=`<rect x="218" y="83" width="47" height="15" rx="7" fill="#a2acc8"/><ellipse cx="149" cy="96" rx="83" ry="58" fill="#414e6b"/><ellipse cx="149" cy="90" rx="74" ry="48" fill="#202e49"/>${leaf}${dots}<ellipse cx="156" cy="113" rx="23" ry="16" fill="#fff2ca"/><circle cx="155" cy="111" r="10" fill="#ffbf57"/><path d="m94 113 16 13m76-46 13 13" stroke="${sauce}" stroke-width="13" stroke-linecap="round"/>`;
  else dish=`<ellipse cx="149" cy="114" rx="83" ry="37" fill="#abbbea"/><path d="M68 98h162q-8 64-81 64T68 98" fill="#dce7ff"/><ellipse cx="149" cy="97" rx="81" ry="35" fill="#f4f4ff"/><ellipse cx="149" cy="96" rx="70" ry="27" fill="${family==='soups'||family==='curries'?sauce:'#eddcba'}"/>${leaf}${dots}<path d="m98 99 14 11m75-15 13 10m-55 8 13 12" stroke="${sauce}" stroke-width="14" stroke-linecap="round"/>${family==='pasta'||family==='noodles'?'<path d="M123 99q12-18 28 0t27-2m-58 10q12-18 28 0t27-2" stroke="#f7c878" stroke-width="5" fill="none"/>':''}`;
  return `<svg class="food-art" viewBox="0 0 300 190" fill="none" aria-hidden="true"><ellipse cx="151" cy="166" rx="85" ry="9" fill="#030815" opacity=".22"/>${dish}<path d="m59 45 4-8m177 92 7 3M205 27l5 7" stroke="#fff" opacity=".5" stroke-width="3" stroke-linecap="round"/><circle cx="77" cy="151" r="3" fill="#fff" opacity=".45"/></svg>`;
}
