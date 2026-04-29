import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// --- TRADUZIONI NAVBAR/FOOTER (Solo UI, il testo legale resta in Inglese) ---
const translations = {
    it: {
        back: "← TORNA ALLA HOME",
    },
    en: {
        back: "← BACK TO HOME",
    }
};

export default function TermsPage() {
    const { lang } = useLanguage();
    const t = translations[lang];

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <div className="w-full relative flex-1 pb-20">
            {/* Barra di progresso lettura */}
            <motion.div className="progress-bar fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-[200]" style={{ scaleX }} />
            <div className="spotlight fixed inset-0 pointer-events-none" />



            {/* --- HEADER --- */}
            <header className="pt-40 pb-10 px-6 text-center relative z-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <Link to="/" className="text-[10px] font-mono tracking-widest text-indigo-400 hover:text-white transition-colors mb-8 inline-block">
                        {t.back}
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase">
                        TERMS OF <span className="text-indigo-500">SERVICE</span>
                    </h1>
                    <p className="font-mono text-zinc-500 text-xs mt-4 tracking-widest uppercase">
                        LAST_UPDATED: [ MARCH 2026 ]
                    </p>
                </motion.div>
            </header>

            {/* --- CONTENUTO LEGALE INTEGRALE --- */}
            <main className="px-6 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-4xl mx-auto bg-zinc-900/40 border border-white/5 rounded-[30px] p-8 md:p-14 backdrop-blur-md"
                >
                    <div className="space-y-12 text-sm md:text-base font-mono leading-relaxed text-zinc-400">

                        <section>
                            <h2 className="text-xl font-black italic text-white uppercase mb-4 tracking-tight border-b border-white/10 pb-2">OVERVIEW</h2>
                            <p className="mb-4">
                                Please read these Terms of Service carefully before accessing or using our website, software, and online tools. Throughout the site and other platforms (the "Site", the "Web Console", and the "Services"), the terms "we", "us" and "our" refer to J-RAY PRO. J-RAY PRO offers this website, the interactive Web Console (Online Demo), and the downloadable desktop applications. By accessing or using any part of the site and services, you agree to be bound by these Terms of Service.
                            </p>
                            <p>
                                These Terms of Service apply to all users of the site and the services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black italic text-white uppercase mb-4 tracking-tight border-b border-white/10 pb-2">SECTION 1 - GENERAL TERMS</h2>
                            <p className="mb-4">By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.</p>
                            <p className="mb-4">You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).</p>
                            <p className="mb-4">You must not transmit any worms or viruses or any code of a destructive nature.</p>
                            <p className="mb-4">A breach or violation of any of the Terms will result in an immediate termination of your Services.</p>
                            <p className="mb-4">We reserve the right to refuse service to anyone for any reason at any time.</p>
                            <p className="mb-4">You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.</p>
                            <p>The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black italic text-white uppercase mb-4 tracking-tight border-b border-white/10 pb-2">SECTION 2 - REGISTRATION & LICENSE ACCOUNT</h2>
                            <p className="mb-4">Certain of the Services or portions of the Site may require you to register for a License, becoming a "Registered User". As part of the License creation process, you may be asked to provide an email unique to the Account ("Login Information"). You are responsible for the confidentiality and use of your Login Information and agree not to transfer or disclose your Login Information (including your License Key) to any third party other than an individual with express authority to act on your behalf.</p>
                            <p className="mb-4">Our Services are offered under the following tiers: a free 7-day Trial Version, a Personal License (valid for up to 1 device), and a PRO License (valid for up to 2 devices and unlocking premium features like Radar API and Visual Diff).</p>
                            <p>If you suspect any unauthorized use of your Account or License Key, you agree to notify us immediately. You are solely responsible for any activities occurring under your Account. You have no ownership right to your Account. If you are registering an Account on behalf of an organization under an agreement between us and another organization, that organization may have administrator rights to access your account and any information provided under your Account. If the terms of your Account or subscription grant access to the Services to a certain number of persons (each an "Authorized User"), you represent and warrant that only Authorized Users shall have access to the Services. These Terms will apply to each Authorized User, and a breach of these Terms by an Authorized User will entitle us to terminate your Account with no refund due to you for any prepaid fees.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black italic text-white uppercase mb-4 tracking-tight border-b border-white/10 pb-2">SECTION 3 - PERMITTED USES/LICENSE</h2>
                            <p>You are authorized to access the Site for the sole purpose of viewing and using the Services on your computer or device. You may not, and shall not permit any other person, to: copy the Services, in whole or in part; (a) modify, correct, adapt, translate, enhance or otherwise prepare derivative works or improvements of any Services; (b) rent, lease, lend, sell, sublicense, assign, distribute, publish, transfer or otherwise make available the Services to any person, including on or in connection with the internet or any time-sharing, service bureau, software as a service, cloud or other technology or service; (c) reverse engineer, disassemble, decompile, decode or adapt the Services, or otherwise attempt to derive or gain access to the source code of the Services, in whole or in part; (d) bypass or breach any security device, trial expiration mechanism, or protection used for or contained in the Services or documentation therefor ("Documentation"); (e) remove, delete, efface, alter, obscure, translate, combine, supplement or otherwise change any trademarks, terms of the Documentation, warranties, disclaimers, or intellectual property rights, proprietary rights or other symbols, notices, marks or serial numbers on or relating to any copy of the Services or Documentation; (f) use the Services in any manner or for any purpose that infringes, misappropriates or otherwise violates any intellectual property right or other right of any person or entity, or that violates any applicable law; (g) use the Services for any purpose that is to our detriment or commercial disadvantage, including, but not limited to, developing a competing software product or service; or (h) use the Services other than for the permitted uses or in any manner or for any purpose or application not expressly permitted by these Terms (including using the Radar API feature for malicious network attacks).</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black italic text-white uppercase mb-4 tracking-tight border-b border-white/10 pb-2">SECTION 4 - USE OF THE SERVICES & WEB CONSOLE</h2>
                            <p>Some of the Services, including the browser-based Web Console and the Desktop Application, may be used to develop, manage, parse and debug JSON data, APIs, and encoded tokens ("Data"). You acknowledge and agree that the Web Console operates entirely client-side within your browser for demonstration and utility purposes. You accept sole responsibility for any errors, browser crashes, or memory overloads caused by pasting massive Data payloads into the Web Console. You are responsible for securing and backing up your Data; as the processing is strictly local, we have no capability, responsibility, or liability to recover any lost User Content or JSON structures.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black italic text-white uppercase mb-4 tracking-tight border-b border-white/10 pb-2">SECTION 5 - THIRD PARTY SITES</h2>
                            <p>The Site may contain links to websites we do not operate, control, or maintain ("Third Party Websites"). We do not endorse any Third Party Websites, and we make no representation or warranty in any respect regarding the Third Party Websites. Any links to Third Party Websites on the Site are provided solely for your convenience. If you do access any Third Party Websites, you do so at your own risk and waive any and all claims against us regarding the Third Party Websites or our links thereto.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black italic text-white uppercase mb-4 tracking-tight border-b border-white/10 pb-2">SECTION 6 - USER CONTENT GENERALLY</h2>
                            <p>When you post content and information to the Site or in connection with the Services ("User Content", but the term User Content excludes data you create using the Services and any JSON structures written by you to be used with the Services, as you will retain rights to such data), you represent and warrant to us that (1) you own or have rights to use the User Content, (2) the posting of the User Content does not violate any rights of any person or entity, and (3) you have no agreement with or obligations to any third party that would prohibit your use of the Site or Services in the manner so used. You agree to pay all royalties, fees, and any other monies owing to any person or entity by reason of any User Content posted by you to the Site or through the Services. By posting User Content, you give us and our affiliates right to use and display such User Content in such manner as is necessary to provide the Services to you; provided that this right shall not give us any ownership or other rights in the User Content. Please note that if you provide us with feedback or suggestions regarding the Site or the Services, you grant us an unlimited, royalty-free, perpetual, sublicensable, transferable, worldwide, irrevocable license to use such suggestions or feedback without providing you with any attribution or compensation to you for the same.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black italic text-white uppercase mb-4 tracking-tight border-b border-white/10 pb-2">SECTION 7 - USER CONDUCT</h2>
                            <p>You agree not to use the Site or the Services to take any action or actions that (including with respect to any User Content): (1) are patently offensive in any manner (as determined in our sole discretion), (2) involve commercial activities without our prior written consent, such as contests or sweepstakes, (3) are contrary to our public image, goodwill, or reputation, (4) infringe on our or any third party's intellectual property rights, (5) violate any law or any third party's legal rights, or (6) "frame" or "mirror" any part of the Site without our prior written consent.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black italic text-white uppercase mb-4 tracking-tight border-b border-white/10 pb-2">SECTION 8 - YOUR PRIVACY</h2>
                            <p>At J-RAY PRO, we respect the privacy of our users. For details please see our Privacy Policy. By using the Service, you consent to our collection and use of data as outlined therein. The Software operates locally on your machine and does not transmit your parsed JSON data to our servers.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black italic text-white uppercase mb-4 tracking-tight border-b border-white/10 pb-2">SECTION 9 - PAID SERVICES & REFUNDS</h2>
                            <p>Our order process is conducted by our online reseller Lemon Squeezy. Lemon Squeezy is the Merchant of Record for all our orders and handles secure transactions and local taxes. Because we provide a fully functional 7-day free trial to allow you to evaluate the Software prior to purchase, all sales are final. For consumers residing in the European Union, by activating the License Key and unlocking the digital content, you expressly consent to the immediate performance of the contract and acknowledge that you will lose your 7-day right of withdrawal.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black italic text-white uppercase mb-4 tracking-tight border-b border-white/10 pb-2">SECTION 10 - COPYRIGHT INFRINGEMENT</h2>
                            <p>We respect the intellectual property rights of others. The Digital Millennium Copyright Act of 1998 (the "DMCA") provides a complaint procedure for copyright owners who believe that website material infringes their rights under U.S. copyright law. If you believe that your work has been improperly copied and posted on the website, please provide us with the following information: (1) name, address, telephone number, email address and an electronic or physical signature of the copyright owner or of the person authorized to act on his/ her behalf; (2) a description of the copyrighted work that you claim has been infringed; (3) a description of where on the Site the material that you claim is infringing is located; (4) a written statement that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law; and (5) a statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf. These requirements must be followed to give Company legally sufficient notice of infringement. Send copyright infringement complaints to the following email address: support@j-ray-pro.com. We suggest that you consult your legal advisor before filing a DMCA notice with Company's copyright agent. There can be penalties for false claims under the DMCA.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black italic text-white uppercase mb-4 tracking-tight border-b border-white/10 pb-2">SECTION 11 - WARRANTY DISCLAIMER</h2>
                            <p>You agree that the Services are available on an "as is" basis, without any warranty, and that you use the Services at your own risk. We disclaim, to the maximum extent permitted by law, any and all warranties, whether express or implied, including, without limitation, (a) warranties of merchantability or fitness for a particular purpose, (b) warranties against infringement of any third party intellectual property or proprietary rights, (c) warranties relating to delays, interruptions, errors, or omissions in the Services or on the Site, (d) warranties relating to the accuracy or correctness of data on the Services, and (e) any other warranties otherwise relating to our performance, nonperformance, or other acts or omissions. We do not warrant that the Site or the Services will operate error-free. Some jurisdictions do not allow the exclusion or limitation of certain categories of damages or implied warranties; therefore, the above limitations may not apply to you. In jurisdictions, our liability is limited to the greatest extent permitted by law.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black italic text-white uppercase mb-4 tracking-tight border-b border-white/10 pb-2">SECTION 12 - LIMITATION OF LIABILITY</h2>
                            <p className="uppercase text-[13px] leading-relaxed">
                                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, AND EXCEPT IN CASES OF INTENTIONAL MISCONDUCT OR GROSS NEGLIGENCE, IN NO EVENT SHALL J-RAY PRO OR ITS SUPPLIERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES OF ANY KIND WHATSOEVER, INCLUDING DATA LOSS OR CORRUPTION. IN NO EVENT SHALL THE TOTAL LIABILITY EXCEED THE GREATER OF $100 OR THE FEES PAID BY YOU FOR THE SERVICES DURING THE 12-MONTH PERIOD PRECEDING THE APPLICABLE CLAIM. YOU ARE SOLELY RESPONSIBLE FOR SECURING AND BACKING UP YOUR DATA BEFORE USING THE SOFTWARE.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black italic text-white uppercase mb-4 tracking-tight border-b border-white/10 pb-2">SECTION 13 - INDEMNIFICATION</h2>
                            <p>You agree to indemnify and hold harmless us, our affiliates and our and their officers, directors, partners, agents, and employees from and against any loss, liability, claim, or demand, including reasonable attorneys' fees (collectively, "Claims"), made by any third party due to or arising out of your use of the Site and Services in violation of these Terms, any breach of the representations and warranties you make in these Terms, your User Content, or any corruption of or damage to your Data resulting from your use of the Services. You agree to be solely responsible for defending any Claims against or suffered by us, subject to our right to participate with counsel of our own choosing.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black italic text-white uppercase mb-4 tracking-tight border-b border-white/10 pb-2">SECTION 14 - MISCELLANEOUS</h2>
                            <p>We may assign, transfer, delegate, or otherwise hypothecate our rights under these Terms in our sole discretion. If we fail to enforce a provision of these Terms, you agree that such a failure does not constitute a waiver to enforce the provision (or any other provision hereunder). If any provision of these Terms is held or made invalid, the invalidity does not affect the remainder of these Terms. We reserve all rights not expressly granted in these Terms and disclaim all implied licenses.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black italic text-white uppercase mb-4 tracking-tight border-b border-white/10 pb-2">SECTION 15 - GOVERNING LAW</h2>
                            <p>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of Italy.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black italic text-white uppercase mb-4 tracking-tight border-b border-white/10 pb-2">SECTION 16 - CHANGES TO TERMS OF SERVICE</h2>
                            <p className="mb-4">You can review the most current version of the Terms of Service at any time at this page.</p>
                            <p>We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black italic text-white uppercase mb-4 tracking-tight border-b border-white/10 pb-2">SECTION 17 - DATA PROCESSING, PRIVACY AND LICENSING</h2>
                            <p>J-RAY PRO is a client-side, local-first application. We do not collect, read, transmit, or store your JSON data, API payloads, or decrypted tokens. To prevent piracy, our software generates a Hardware ID (Machine ID) upon license activation. This ID is irreversibly hashed (via SHA-256) locally on your device before being transmitted to our payment provider, Lemon Squeezy, exclusively to validate your license key. We cannot reverse this hash to identify your specific hardware components. By entering your license key, you consent to this standard verification process.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black italic text-white uppercase mb-4 tracking-tight border-b border-white/10 pb-2">SECTION 18 - CONTACT INFORMATION</h2>
                            <p className="mb-2">Questions about the Terms of Service should be sent to us at:</p>
                            <a href="mailto:support@j-ray-pro.com" className="text-indigo-400 hover:text-cyan-400 transition-colors underline decoration-indigo-400/30 underline-offset-4">
                                support@j-ray-pro.com
                            </a>
                        </section>

                    </div>
                </motion.div>
            </main>


        </div>
    );
}