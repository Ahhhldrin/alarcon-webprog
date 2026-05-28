import Button from '../../components/Button';
import { SmokeBackground } from '../../components/ui/spooky-smoke-animation';
import sys1 from '../../assets/images/sys1.jpg';
import sys2 from '../../assets/images/sys2.jpg';
import sys4 from '../../assets/images/sys4.png';
import sys5 from '../../assets/images/sys5.png';
import setupImg from '../../assets/images/setup.jpg';
 
const AboutPage = () => {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="relative min-h-[500px] border-y-2 border-zinc-900 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 overflow-hidden bg-gradient-to-b from-transparent to-zinc-50">
                <div className="absolute inset-0 top-0 left-0 right-0 bottom-0">
                    <SmokeBackground smokeColor="#3B82F6" />
                </div>
                <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div className="rounded-3xl border-2 bordere-dashed border-zinc-300 bg-zinc-100 p-6">
                        <div className="relative h-64 overflow-hidden rounded-[1.25rem] bg-zinc-200">
                            <img src={setupImg} alt="Setup" className="w-full h-full object-cover" />
                        </div>
                    </div>
 
                    <div>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white">
                            About Me
                        </p>
                        <h1 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl text-justify">
                            I’m a developer who enjoys turning ideas into real, working systems.  
                            I build web applications that are not only functional but meaningful 
                        </h1>
                        <p className="mt-4 max-w-lg text-sm leading-7 text-white sm:text:base">
                            
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Button to="/" variant="primary">
                                Back Home
                            </Button>
                            <Button to="/articles" variant="primary" className="text-white">
                                Open Articles
                            </Button>
                        </div>
                        
                    </div>
                </div>
            </section>
 
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Profile Overview
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                        Skills
                    </h2>
                </div>
 
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">Java</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Programming Language
                            </p>
                    </div>
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">JavaScript</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Programming Language
                        </p>
                    </div>
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">Flutter</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Programming Language
                        </p>
                    </div>
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">SQL</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Data Manipulation
                        </p>
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Section Flow
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                        Experience
                    </h2>
                </div>

                <div className="mt-6 space-y-4">
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <h3 className="text-lg font-semibold text-zinc-900">Capstone Main Developer</h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Built a Commuter Routing Transportation Suggestion System with implementation of Prescriptive Analytics and Crowdsourcing .
                        </p>
                    </article>
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <h3 className="text-lg font-semibold text-zinc-900">Tech Support</h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Provided technical assistance and troubleshooting for end-users and internal teams.
                        </p>
                    </article>
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <h3 className="text-lg font-semibold text-zinc-900">Jr. Network Administrator </h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Assisted in managing and maintaining the organization's network infrastructure, ensuring optimal performance and security.
                        </p>
                    </article>
                </div>
            </section>

            <section className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                    Projects
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <img src={sys1} alt="Grid Item 1" className="w-full aspect-square rounded-[1.25rem] object-cover" />
                    <img src={sys2} alt="Grid Item 2" className="w-full aspect-square rounded-[1.25rem] object-cover" />
                    <img src={sys4} alt="Grid Item 3" className="w-full aspect-square rounded-[1.25rem] object-cover" />
                    <img src={sys5} alt="Grid Item 4" className="w-full aspect-square rounded-[1.25rem] object-cover" />
                </div>
                <div className="mt-5">
                    <Button variant="primary text-black">View Section</Button>
                </div>
            </section>
        </div>
    )
}

export default AboutPage;