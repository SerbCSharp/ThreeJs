varying vec3 vColor;

void main()
{
    // Disc
    // float strenght = distance(gl_PointCoord, vec2(0.5));
    // strenght = 1.0 - step(0.5, strenght);

    // Diffuse point
    // float strenght = distance(gl_PointCoord, vec2(0.5));
    // strenght *= 2.0;
    // strenght = 1.0 - strenght;

    // Light point
    float strenght = distance(gl_PointCoord, vec2(0.5));
    strenght = 1.0 - strenght;
    strenght = pow(strenght, 10.0);

    vec3 color = mix(vec3(0.0), vColor, strenght);

    gl_FragColor = vec4(color, 1.0);
}