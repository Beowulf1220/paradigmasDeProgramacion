const turn = () => {
    if(document.getElementById("foco").src.match("focoOff")) foco.src = "focoOn.png";
    else foco.src = "focoOff.png";
}