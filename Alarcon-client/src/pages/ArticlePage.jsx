import Button from '../components/Button';
import { SmokeBackground } from '../components/ui/spooky-smoke-animation';
import reactImg from '../assets/images/react.png';
import flutterImg from '../assets/images/flutter.png';
import pythonImg from '../assets/images/python.jpg';
import wiresharkImg from '../assets/images/wireshark.png';

const ArticlePage = () => {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="relative min-h-[500px] border-y-2 border-zinc-900 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 overflow-hidden bg-gradient-to-b from-transparent to-zinc-50">
                <div className="absolute inset-0 top-0 left-0 right-0 bottom-0">
                    <SmokeBackground smokeColor="#3B82F6" />
                </div>
                <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div className="rounded-3xl border-2 border-zinc-900 bg-transparent p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white">
                            Skills In Progress
                        </p>
                        <h1 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
                            Currently I am expanding my knowledge in web development, exploring new frameworks, and working to acquire to improve my skills .
                        </h1>
                        <div className="mt-6"> 
                            <Button to="/" variant="primary text-white">
                                Back Home
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                       In Progess
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                        Now Exploring
                    </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                            <img src={reactImg} alt="React" className="w-full h-full object-cover rounded-[1.25rem]" />
                        </div>
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                           Web Development
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                            React JS
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Developing skills in building dynamic and responsive web interfaces using modern component-based architecture.
                        </p>
                        <Button className="mt-4">Read More</Button>
                    </article>

                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                            <img src={flutterImg} alt="Flutter" className="w-full h-full object-cover rounded-[1.25rem]" />
                        </div>
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Mobile Development
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                            Flutter
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            To create cross-platform mobile applications with smooth UI and efficient performance..
                        </p>
                        <Button className="mt-4">Read More</Button>
                    </article>

                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                            <img src={pythonImg} alt="Python" className="w-full h-full object-cover rounded-[1.25rem]" />
                        </div>
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Algorithm
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                            Python
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Enhancing my ability to design and implement efficient algorithms for problem-solving.
                        </p>
                        <Button className="mt-4">Read More</Button>
                    </article>

                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                            <img src={wiresharkImg} alt="Wireshark" className="w-full h-full object-cover rounded-[1.25rem]" />
                        </div>
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                           Network Forensic
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                            WireShark
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                           Building skills in network forensics by analyzing and interpreting network traffic for security insights.
                           </p>
                        <Button className="mt-4">Read More</Button>
                    </article>
                </div>
            </section>
        </div>
    );
};

export default ArticlePage;
