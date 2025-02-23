import Environment  from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'

export default class World
{
    constructor(experience)
    {
        this.experience = experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on('ready', () =>
        {
            this.floor = new Floor(this.experience)
            this.fox = new Fox(this.experience)
            this.environment = new Environment(this.experience)
        })
    }

    update()
    {
        if(this.fox)
            this.fox.update()
    }
}
