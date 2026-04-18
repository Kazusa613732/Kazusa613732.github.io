/**
 * About Page
 * Design: Hacker Zine - minimalist profile with terminal aesthetic
 * Features: researcher bio, skills, tools, contact info
 */

import { useTheme } from './ThemeContext';
import { Github, Twitter, Mail, Shield, Terminal, Code2, Award, BookOpen } from 'lucide-react';
import TagPill from './TagPill';

import avatarImg from './image/ousu.jpeg';

const AVATAR_IMG = avatarImg;

function DiscordIcon({ size = 13 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.317 4.369A19.79 19.79 0 0 0 15.885 3c-.191.328-.403.77-.553 1.117a18.36 18.36 0 0 0-5.33 0A12.45 12.45 0 0 0 9.45 3a19.736 19.736 0 0 0-4.436 1.37C2.207 8.458 1.447 12.445 1.82 16.376a19.93 19.93 0 0 0 5.436 2.754c.44-.6.832-1.235 1.17-1.903-.64-.243-1.252-.545-1.826-.9.153-.112.303-.23.447-.35 3.52 1.654 7.34 1.654 10.818 0 .146.12.295.238.447.35-.574.356-1.188.658-1.829.902.338.667.73 1.302 1.17 1.902a19.88 19.88 0 0 0 5.44-2.754c.438-4.557-.748-8.507-3.37-12.007ZM8.02 13.96c-1.057 0-1.93-.963-1.93-2.147s.853-2.147 1.93-2.147c1.087 0 1.95.973 1.93 2.147 0 1.184-.853 2.147-1.93 2.147Zm7.13 0c-1.058 0-1.93-.963-1.93-2.147s.853-2.147 1.93-2.147c1.086 0 1.95.973 1.93 2.147 0 1.184-.844 2.147-1.93 2.147Z" />
    </svg>
  );
}

const achievements = [
  { icon: '🏆', text: '2025 AIS3新型態資安實務主題課程 最佳專題' },
  { icon: '⚔️', text: '行政院網路攻防演練攻擊手' },
  { icon: '🔎', text: 'CVE-2025-54476' },
];

const researchAreas = [
  'web', 'ctf', 'PT','HTB',
];

export default function About() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen animate-fade-in-up">
      <div className="container py-8">
        <div className="max-w-3xl">
          {/* Profile header */}
          <div
            className="flex flex-col sm:flex-row gap-6 items-start mb-10 pb-8 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div
                className="w-24 h-24 rounded-sm overflow-hidden"
                style={{ border: '2px solid var(--border)' }}
              >
                <img
                  src={AVATAR_IMG}
                  alt="Researcher Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1
                  className="text-xl font-mono font-bold"
                  style={{ color: 'var(--foreground)' }}
                >
                  楊博宇（Poi/Kazusa）
                </h1>
                <span
                  className="text-xs font-mono px-1.5 py-0.5 rounded-sm"
                  style={{
                    background: 'color-mix(in oklch, var(--color-green) 10%, transparent)',
                    color: 'var(--color-green)',
                    border: '1px solid color-mix(in oklch, var(--color-green) 30%, transparent)',
                  }}
                >
                  [ACTIVE]
                </span>
              </div>

              <p
                className="text-sm font-mono mb-3"
                style={{ color: 'var(--color-blue)' }}
              >
                /root
              </p>

              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: 'var(--muted-foreground)' }}
              >
                記錄我在網路安全領域的學習歷程，包含滲透測試、CTF 解題、技術學習等。
                透過整理技術學習筆記，持續深化對攻防技術的理解。
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3">

                <a
                  href="https://github.com/Kazusa613732"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono transition-colors"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  <Github size={13} />
                  GitHub
                </a>
                <a
                  href="mailto:aa20011204@gmail.com"
                  className="flex items-center gap-1.5 text-xs font-mono transition-colors"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  <Mail size={13} />
                  Email
                </a>
              </div>
            </div>
          </div>

          {/* Research areas */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={14} style={{ color: 'var(--color-blue)' }} />
              <h2
                className="text-sm font-mono font-semibold uppercase tracking-widest"
                style={{ color: 'var(--muted-foreground)' }}
              >
                Research Areas
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {researchAreas.map((tag) => (
                <TagPill key={tag} tag={tag} size="md" />
              ))}
            </div>
          </section>

          {/* About text */}
          <section
            className="mb-8 pb-8 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Terminal size={16} style={{ color: 'var(--color-blue)' }} />
              <h2
                className="text-sm font-mono font-semibold uppercase tracking-widest"
                style={{ color: 'var(--muted-foreground)' }}
              >
                whoami
              </h2>
            </div>

            <div
              className="p-4 rounded-sm font-mono text-sm leading-relaxed mb-4"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
              }}
            >
              <p className="mb-2">
                <span style={{ color: 'var(--color-green)' }}>$</span>{' '}
                <span style={{ color: 'var(--color-blue)' }}>cat</span> about.txt
              </p>
              <div
                className="pl-4 border-l-2 space-y-2"
                style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
              >
                <p>
                  我是楊博宇，常用ID有 Poi、Kazusa，
                  目前就讀國立雲林科技大學/資工所/資訊安全實驗室，
                  在資訊安全方面主要領域是 Web Security 與 Penetration Test 。
                </p>                
                <p>
                  這個部落格的目的是記錄學習過程，分享技術筆記，同時也是筆記存放處，在未來需要時方便查找。
                  所有技術內容僅供教育目的，請合法、負責任地使用。
                </p>
              </div>
            </div>

            <div
              className="p-4 rounded-sm font-mono text-sm leading-relaxed mb-4"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
              }}
            >
              <p className="mb-2">
                <span style={{ color: 'var(--color-green)' }}>$</span>{' '}
                <span style={{ color: 'var(--color-blue)' }}>cat</span> Education.txt
              </p>
              <div
                className="pl-4 border-l-2 space-y-2"
                style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
              >
                <p>
                  2020.9 - 2024.6 國立虎尾科技大學 資訊工程系
                </p>                
                <p>
                  2024.9 - Now 國立雲林科技大學 資訊工程所 資訊安全實驗室
                </p>
              </div>
            </div>

            <div
              className="p-4 rounded-sm font-mono text-sm leading-relaxed mb-4"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
              }}
            >
              <p className="mb-2">
                <span style={{ color: 'var(--color-green)' }}>$</span>{' '}
                <span style={{ color: 'var(--color-blue)' }}>cat</span> Certificate.txt
              </p>
              <div
                className="pl-4 border-l-2 space-y-2"
                style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
              >
                <p>
                  經濟部 IPAS資安工程師 初級鑑定
                </p>                
                <p>
                  EC-Council CEH
                </p>
                <p>
                  電腦軟體應用 丙級
                </p>
              </div>
            </div>

            <div
              className="p-4 rounded-sm font-mono text-sm leading-relaxed mb-4"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
              }}
            >
              <p className="mb-2">
                <span style={{ color: 'var(--color-green)' }}>$</span>{' '}
                <span style={{ color: 'var(--color-blue)' }}>cat</span> Experiences.txt
              </p>
              <div
                className="pl-4 border-l-2 space-y-2"
                style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
              >
                <p>
                  2025、2026年 行政院 國家資通安全研究院 網路攻防演練攻擊手
                </p>                
                <p>
                  2025 AIS3新型態資安實務主題課程 學員
                </p>
                <p>
                  第十屆 AIS3好厲駭 高階學員
                </p>
                <p>
                  成大CTF B33F SOUP 戰隊成員
                </p>
                <p>
                  Hitcon ZeroDay 漏洞通報平台
                </p>
              </div>
            </div>

          </section>

          {/* Achievements */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Award size={14} style={{ color: 'var(--color-blue)' }} />
              <h2
                className="text-sm font-mono font-semibold uppercase tracking-widest"
                style={{ color: 'var(--muted-foreground)' }}
              >
                Highlights
              </h2>
            </div>
            <div className="space-y-2">
              {achievements.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-sm"
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <span className="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Disclaimer */}
          <div
            className="p-4 rounded-sm"
            style={{
              background: 'color-mix(in oklch, var(--color-yellow) 5%, transparent)',
              border: '1px solid color-mix(in oklch, var(--color-yellow) 25%, transparent)',
            }}
          >
            <p
              className="text-xs font-mono leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <span style={{ color: 'var(--color-yellow)' }}>⚠ DISCLAIMER:</span>{' '}
              本部落格所有技術內容僅供教育目的與合法的 CTF 競賽、環境使用。
              請勿將這些技術用於未授權的系統。作者不對任何濫用行為負責。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
